const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors())

const wordSchema = new mongoose.Schema({
  German: String,
  English: String,
  Example: String,
  EnglishExample: String
});

const Word = mongoose.model('Word', wordSchema);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Database connected!')).catch(err => console.log(err));

app.get('/', (req, res) => {
  Word.find({})
    .then(words => res.json(words))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/search', (req, res) => {
  const q = req.query.q; 
  if (!q) { return res.status(400).json({ error: "Missing search query parameter 'q'" }); } 
  Word.find({ $or: [ { German: { $regex: q, $options: 'i' } }, { English: { $regex: q, $options: 'i' } } ] })
  .then(results => res.json(results)) 
  .catch(err => res.status(500).json({ error: err.message })); });

app.get('/word/id/:id', (req, res) => {
  Word.findById(req.params.id) 
  .then(word => { if (!word) { return res.status(404).json({ error: "Word not found" }); } res.json(word); }) 
  .catch(err => res.status(500).json({ error: err.message })); });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
