const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.json(), morgan(":method :url :status :res[content-length] - :response-time ms - :body"), cors(), express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
    `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const getRandomId = () => {
  return Math.floor(Math.random() * Math.floor(99999));
};

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (!(body.name && body.number)) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({
      error: "person is already in the phonebook",
    });
  }

  const person = {
    id: getRandomId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
