const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Connect to SQLite database on the hard disk
let db = new sqlite3.Database("./marsi.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Create lessons table if not exists
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS lessons(id TEXT PRIMARY KEY, title TEXT, level TEXT, description TEXT, score INTEGER, content TEXT, tests TEXT)",
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Lessons table created.");

      // Read and parse the defaultLessons.json file
      const defaultLessonsPath = path.resolve(
        __dirname,
        "../assets/data/defaultLessons.json"
      );
      const defaultLessons = JSON.parse(
        fs.readFileSync(defaultLessonsPath, "utf8")
      );

      // Insert each lesson into the lessons table
      const stmt = db.prepare(
        "INSERT INTO lessons VALUES (?, ?, ?, ?, ?, ?, ?)"
      );
      defaultLessons.forEach((lesson) => {
        stmt.run(
          [
            lesson.id,
            lesson.title,
            lesson.level,
            lesson.description,
            lesson.score,
            JSON.stringify(lesson.content),
            JSON.stringify(lesson.tests),
          ],
          (err) => {
            if (err) {
              return console.error(err.message);
            }
          }
        );
      });
      stmt.finalize(() => {
        // Close the database connection
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Database connection closed.");
        });
      });
    }
  );
});
