const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Beispiel-Daten (kann durch eine Datenbank ersetzt werden)
let sharedGallery = [];
let sharedCalendar = [];
let sharedNotes = [];
let partner = null;

// Partner hinzufügen
app.post('/api/addPartner', (req, res) => {
    const { username } = req.body;
    if (username) {
        partner = { username };
        res.status(200).json({ message: `Partner ${username} erfolgreich hinzugefügt!` });
    } else {
        res.status(400).json({ error: 'Benutzername fehlt.' });
    }
});

// Partner entfernen
app.post('/api/removePartner', (req, res) => {
    partner = null;
    res.status(200).json({ message: 'Partner erfolgreich entfernt!' });
});

// Bilder zur Galerie hinzufügen
app.post('/api/addImage', (req, res) => {
    const { url, date } = req.body;
    if (url && date) {
        const newImage = { id: sharedGallery.length + 1, url, date, completed: false };
        sharedGallery.push(newImage);
        res.status(200).json(newImage);
    } else {
        res.status(400).json({ error: 'URL oder Datum fehlt.' });
    }
});

// Ereignis zum Kalender hinzufügen
app.post('/api/addEvent', (req, res) => {
    const { title, date } = req.body;
    if (title && date) {
        const newEvent = { id: sharedCalendar.length + 1, title, date };
        sharedCalendar.push(newEvent);
        res.status(200).json(newEvent);
    } else {
        res.status(400).json({ error: 'Titel oder Datum fehlt.' });
    }
});

// Notiz hinzufügen
app.post('/api/addNote', (req, res) => {
    const { text, date } = req.body;
    if (text && date) {
        const newNote = { id: sharedNotes.length + 1, text, date, completed: false };
        sharedNotes.push(newNote);
        res.status(200).json(newNote);
    } else {
        res.status(400).json({ error: 'Text oder Datum fehlt.' });
    }
});

// Daten abrufen
app.get('/api/getData', (req, res) => {
    res.status(200).json({ sharedGallery, sharedCalendar, sharedNotes, partner });
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});