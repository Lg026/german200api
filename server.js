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

// Increase the pool size to 5
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 5 })
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  Word.find({}, { _id: 0 })
    .then(words => res.json(words))
    .catch(err => res.status(500).json({ error: err.message }));
});

console.log(Word.find({}))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
