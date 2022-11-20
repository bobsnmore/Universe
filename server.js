//@ts-check
/*
    server.js
    Harrison L. (@Stratiz)
    Created on 11/19/2022 @ 18:07:45
    
    Description:
        Express server for the application.
    
    Documentation:
        No documentation provided.
*/
import express from 'express';
import { getId } from './controllers/idResolver.js';
import { config } from 'dotenv'
// setup .env
config(); 

const PORT = 80;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// "Auth" middleware
app.use(function(req, res, next) {
    if (req.headers.authorization == process.env.API_KEY) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
});

// Routes
app.route("/universeId").get(getId);

// Initializer 
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
