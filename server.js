// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
    notes = JSON.parse(notes)
    res.json(notes)
})

app.listen(PORT, () => {
    console.log("App is runnning on http://localhost:" + PORT)
})

