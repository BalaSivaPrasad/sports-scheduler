const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// --- Setup Middlewares ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// NOTE: In a real app, you would add database connection and session/JWT middleware here.

// --- Root Route: Home Page ---
app.get('/', (req, res) => {
    res.render('home'); // Renders views/home.ejs
});

// --- Authentication Routes ---
app.get('/signup', (req, res) => {
    res.render('signup'); // Renders views/signup.ejs
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    // TODO: 1. Validate input
    // TODO: 2. Hash password (using bcrypt)
    // TODO: 3. Save user to database (Role defaults to 'Player')
    // TODO: 4. Log in the user (Create JWT/Session)
    console.log(`New user signup: ${email}`);
    res.redirect('/main'); // Redirect to the main page after successful signup
});

app.get('/login', (req, res) => {
    res.render('login'); // Renders views/login.ejs
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // TODO: 1. Find user by email in the database
    // TODO: 2. Compare password (using bcrypt.compare)
    // TODO: 3. If valid, create JWT/Session
    console.log(`User login attempt: ${email}`);
    res.redirect('/main'); // Redirect to the main page after successful login
});

// --- Main Application Route (Protected) ---
// NOTE: This route should be protected by a middleware that checks for a valid session/JWT.
app.get('/main', (req, res) => {
    // const userData = req.user; // Get user data from authentication middleware
    const isAdmin = true; // Placeholder for role check
    
    // In a real app, you'd fetch all sessions, user's sessions, etc., from the DB
    const availableSports = ['Soccer', 'Basketball', 'Tennis']; 
    const createdSessions = [ { id: 1, sport: 'Soccer', time: '10:00 AM' } ];
    const joinedSessions = [ { id: 2, sport: 'Basketball', time: '5:00 PM' } ];
    
    res.render('main', {
        userName: 'Player/Admin', // Dynamic Name
        isAdmin: isAdmin,
        availableSports: availableSports,
        createdSessions: createdSessions,
        joinedSessions: joinedSessions
    });
});

// --- Admin Route (Example for creating a sport) ---
app.post('/admin/create-sport', (req, res) => {
    // TODO: 1. Check if user is Admin
    // TODO: 2. Save new sport to DB
    const { sportName } = req.body;
    console.log(`Admin created new sport: ${sportName}`);
    res.redirect('/main'); 
});

// --- Session Route (Example for joining a session) ---
app.post('/sessions/join/:id', (req, res) => {
    const sessionId = req.params.id;
    // TODO: 1. Check for time overlap
    // TODO: 2. Add user to SessionParticipant table
    console.log(`User joined session ${sessionId}`);
    res.redirect('/main'); 
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
