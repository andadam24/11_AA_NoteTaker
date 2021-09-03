//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Set up server
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get('/api/notes',(req, res) => {
    let notes = fs.readFileSync("./db/db.json");
    notes = JSON.parse(notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

app.delete("/api/notes/:id"), (req,res) => {
    const idDelete = parseInt(req.params.id);
    
        let notes = fs.readFileSync("./db/db.json");
        notes = JSON.parse(notes);

        notes = notes.filter(note => {
            return note.id != idDelete
        })
        fs.writeFileSync("./db/db.json", JSON.stringify(notes))
        notes = JSON.parse(notes);
        res.json(notes);
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, () => {
    console.log("App is runnning on http://localhost:" + PORT)
})

