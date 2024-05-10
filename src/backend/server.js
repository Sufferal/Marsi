const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { authenticateToken, authenticate } = require("./jwt");

// Enable CORS
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Load environment variables
require("dotenv").config();

// Swagger UI
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to SQLite database
let db = new sqlite3.Database("./marsi.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("(Connection): Connected to the SQLite database.");
});

// Get JWT token
app.post("/token", (req, res) => {
  const { username, password } = req.body;

  // Mock authentication logic, replace it with your actual authentication mechanism
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ role: "ADMIN" }, process.env.JWT_KEY, {
      expiresIn: "1m",
    });
    res.status(200).json({
      token,
      createdAt: Date.now(),
      duration: parseInt(process.env.JWT_duration),
      message: "Admin logged in successfully",
    });
  } else if (username === "writer" && password === "writer") {
    const token = jwt.sign({ role: "WRITER" }, process.env.JWT_KEY, {
      expiresIn: "1m",
    });
    res.status(200).json({
      token,
      createdAt: Date.now(),
      duration: parseInt(process.env.JWT_duration),
      message: "Writer logged in successfully",
    });
  } else if (username === "visitor" && password === "visitor") {
    const token = jwt.sign({ role: "VISITOR" }, process.env.JWT_KEY, {
      expiresIn: "1m",
    });
    res
      .status(200)
      .json({
        token,
        createdAt: Date.now(),
        duration: parseInt(process.env.JWT_duration),
        message: "Visitor logged in successfully",
      });
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid credentials" });
  }
});

app.get("/lessons", authenticateToken, authenticate("GET"), (req, res) => {
  // First, get the total count of records in the database
  db.get("SELECT COUNT(*) as total FROM lessons", [], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }

    // Use the total count as the limit for the subsequent query
    const limit = req.query.limit ? parseInt(req.query.limit) : row.total;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    // Check if the limit and offset are valid
    if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
      return res.status(400).send("Bad Request: Invalid limit or offset");
    }

    // Check if the offset is within the total number of records
    if (offset >= row.total) {
      return res.status(400).send("Bad Request: Offset out of range");
    }

    db.all(
      "SELECT * FROM lessons LIMIT ? OFFSET ?",
      [limit, offset],
      (err, rows) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          throw err;
        }
        rows.forEach((row) => {
          row.content = JSON.parse(row.content);
          row.tests = JSON.parse(row.tests);
        });
        res.status(200).json(rows);
      }
    );
  });
});

// Get a specific lesson by id
app.get("/lessons/:id", authenticateToken, authenticate("GET"), (req, res) => {
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
app.post("/lessons", authenticateToken, authenticate("POST"), (req, res) => {
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
app.put("/lessons/:id", authenticateToken, authenticate("PUT"), (req, res) => {
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

// Patch a lesson score
app.patch("/lessons/:id", authenticateToken, authenticate("PATCH"), (req, res) => {
  const lessonId = req.params.id;
  const score = req.body.score;

  // Validation
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    return res.status(400).send("Bad Request: Invalid score");
  }

  db.get("SELECT * FROM lessons WHERE id = ?", [lessonId], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      throw err;
    }
    if (!row) {
      return res.status(404).send("Lesson not found");
    }
    db.run(
      "UPDATE lessons SET score = ? WHERE id = ?",
      [score, lessonId],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        res.status(200).json("Lesson score updated successfully");
      }
    );
  });
});

// Delete a lesson
app.delete(
  "/lessons/:id",
  authenticateToken,
  authenticate("DELETE"),
  (req, res) => {
    db.get(
      "SELECT * FROM lessons WHERE id = ?",
      [req.params.id],
      (err, row) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          throw err;
        }
        if (!row) {
          return res.status(404).send("Lesson not found");
        }
        db.run(
          "DELETE FROM lessons WHERE id = ?",
          req.params.id,
          function (err) {
            if (err) {
              return console.error(err.message);
            }
            res.status(200).send("Lesson deleted successfully");
          }
        );
      }
    );
  }
);

const port = process.env.PORT;
app.listen(port, () => console.log(`(Server): Running on port ${port}`));
