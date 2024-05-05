const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Enable CORS
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Swagger UI
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to SQLite database
let db = new sqlite3.Database("./marsi.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("(Connection): Connected to the SQLite database.");
});

app.get("/lessons", (req, res) => {
  db.all("SELECT * FROM lessons", [], (err, rows) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }
    rows.forEach((row) => {
      row.content = JSON.parse(row.content);
      row.tests = JSON.parse(row.tests);
    });
    res.status(200).json(rows);
  });
});

// Get a specific lesson by id
app.get("/lessons/:id", (req, res) => {
  db.get("SELECT * FROM lessons WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }
    // If the lesson is not found
    if (!row) {
      return res.status(404).send("Lesson not found");
    }
    res.status(200).json(row);
  });
});

// Add a new lesson
app.post("/lessons", (req, res) => {
  const newLesson = req.body;

  if (
    !newLesson.id ||
    !newLesson.title ||
    !newLesson.level ||
    !newLesson.description ||
    !Number.isInteger(newLesson.score) ||
    !newLesson.content ||
    !newLesson.tests
  ) {
    console.log(
      !newLesson.id,
      !newLesson.title,
      !newLesson.level,
      !newLesson.description,
      !newLesson.score,
      !newLesson.content,
      !newLesson.tests
    );
    return res.status(400).send("Bad Request: Missing required fields");
  }

  // Check if the id already exists
  db.get("SELECT * FROM lessons WHERE id = ?", [newLesson.id], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      console.error(err.message);
      return;
    }
    if (row) {
      return res
        .status(400)
        .send("Bad Request: Lesson with the same id already exists");
    }

    // Insert the lesson into the database
    db.run(
      "INSERT INTO lessons(id, title, level, description, score, content, tests) VALUES(?,?,?,?,?,?,?)",
      [
        newLesson.id,
        newLesson.title,
        newLesson.level,
        newLesson.description,
        newLesson.score,
        JSON.stringify(newLesson.content),
        JSON.stringify(newLesson.tests),
      ],
      function (err) {
        if (err) {
          res.status(500).send("Internal Server Error");
          throw err;
        }
        res.status(201).json({
          message: "Lesson added successfully",
          newLesson: newLesson,
        });
      }
    );
  });
});

// Update a lesson
app.put("/lessons/:id", (req, res) => {
  const lesson = req.body;

  // Validation
  if (
    !lesson.title ||
    !lesson.level ||
    !lesson.description ||
    !Number.isInteger(lesson.score) ||
    !lesson.content ||
    !lesson.tests
  ) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  db.get("SELECT * FROM lessons WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }
    if (!row) {
      return res.status(404).send("Lesson not found");
    }
    db.run(
      "UPDATE lessons SET title = ?, level = ?, description = ?, score = ?, content = ?, tests = ? WHERE id = ?",
      [
        lesson.title,
        lesson.level,
        lesson.description,
        lesson.score,
        JSON.stringify(lesson.content),
        JSON.stringify(lesson.tests),
        req.params.id,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        res.status(200).json("Lesson updated successfully");
      }
    );
  });
});

// Delete a lesson
app.delete("/lessons/:id", (req, res) => {
  db.get("SELECT * FROM lessons WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }
    if (!row) {
      return res.status(404).send("Lesson not found");
    }
    db.run("DELETE FROM lessons WHERE id = ?", req.params.id, function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.status(200).send("Lesson deleted successfully");
    });
  });
});

const port = 4000;
app.listen(port, () => console.log(`(Server): Running on port ${port}`));
