German 200 API
A lightweight API that serves the 200 most commonly used German words with English translations and example sentences. I built this mainly for my other project, German200, but the API is simple and flexible enough for anyone who wants quick access to a clean German–English word dataset.

The focus is on being minimal, fast, and easy to work with.

Live API
Code
https://languageapi-yne8.onrender.com/
(Free Render instance — may take a few seconds to wake up.)

Endpoints:
GET /
Returns the full list of all 200 words.

GET /word/german/:word
Find a word by its German spelling.
/word/german/sein

GET /word/english/:word
Find a word by its English translation.
/word/english/with

GET /word/id/:id
Look up a word by its MongoDB _id.

GET /word/search?query=...
Search both German and English fields (case‑insensitive).
/word/search?query=dog

GET /word/random
Returns one random word from the dataset.

Tech Stack
Node.js

Express

MongoDB + Mongoose

Render (hosting)

Future Plans
Add categories (verbs, nouns, adjectives)

More example sentences
