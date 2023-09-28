require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")

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
console.log(Word.find({}))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));