//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//Set up server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err,data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        };
    });
});

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("/db/db.json"));
    let newNotes = req.body;
    newNotes.id = uniqueId();
    notes.push(newNotes);
    fs.writeFileSync("/db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data);
        };
    });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, () => {
    console.log("App is runnning on http://localhost:" + PORT)
})

