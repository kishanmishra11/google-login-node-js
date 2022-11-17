const express = require('express')
const passport = require('passport')
const auth = require('./auth')
const session = require('express-session')

const app = express();

function isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401)
}

app.use(session({secret:'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Click here for sign in with google</a>')
});

app.get('/auth/google',
    passport.authenticate('google',{scope:['email', 'profile']})
)

app.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/google/failure',
    })
)

app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello! ${req.user.displayName}`);
});

app.get('/logout',(req,res)=>{
    res.logout();
    req.session.destroy();
    res.send('Good Bye...');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

app.listen(3000,()=> console.log("connection is established on port number 3000"))