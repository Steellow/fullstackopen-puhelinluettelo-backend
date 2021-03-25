const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    numa: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    numa: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    numa: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    numa: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>
  `);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
