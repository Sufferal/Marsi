import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import "../../css/lesson/LessonAdd.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBetween } from "use-between";
import { useTheme } from "../../hooks/useTheme";
import { useLessons } from "../../hooks/useLessons";
import { v4 as uuidv4 } from "uuid";

const LessonAdd = () => {
  const { addLesson } = useBetween(useLessons);
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [tests, setTests] = useState([]);
  const [options, setOptions] = useState([]);
  const { color } = useBetween(useTheme); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const formElement = document.getElementById("add-lesson-form");
    const formData = new FormData(formElement);
    const formJson = Object.fromEntries(formData.entries());
    const { addTitle, addDescription, addLevel, addContent } = formJson;

    if (
      !addTitle ||
      !addLevel ||
      !addDescription ||
      !addContent ||
      tests.length === 0
    ) {
      alert("Please fill in all fields and ensure there is at least one test.");
      return;
    }

    const newLesson = {
      id: uuidv4(), 
      title: addTitle,
      level: addLevel,
      description: addDescription,
      content: addContent.split("\n"),
      tests: tests,
      score: 0,
    };

    handleClose();
    addLesson(newLesson);
    formElement.reset();
    setTests([]);
    setSelectedLevel(null);
  };

  const handleAddOption = () => {
    const optionsInput = document.getElementById("addOption").value;

    if (!optionsInput) {
      alert("Please make sure the option is not empty.");
      return;
    }

    setOptions([...options, optionsInput]);
    document.getElementById("addOption").value = "";
  };

  const handleAddTest = () => {
    const questionInput = document.getElementById("addQuestion").value;
    const answerInput = document.getElementById("addAnswer").value;

    if (!questionInput || !answerInput) {
      alert("Please make sure the question and answer are not empty.");
      return;
    }

    if (options.length < 2) {
      alert("Please make sure there are at least two options.");
      return;
    }

    const newTest = {
      question: questionInput,
      options: options,
      answer: answerInput,
    };

    setTests([...tests, newTest]);

    // Clear the input fields after adding the test
    document.getElementById("addQuestion").value = "";
    document.getElementById("addAnswer").value = "";
    setOptions([]);
  };

  const handleDeleteTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lesson-add">
      <h3 className="lesson-add-title">Add a lesson:</h3>
      <Tooltip title="Add Lesson">
        <IconButton
          edge="start"
          color="success"
          size="large"
          aria-label="close"
          className="add-lesson-btn"
          onClick={handleClickOpen}
        >
          <AddIcon className="lesson-add-icon" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          id: "add-lesson-form",
          style: {
            backgroundColor: color,
          },
        }}
      >
        <DialogTitle className="add-lesson-dialog-title">
          Add a lesson
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="add-lesson-dialog-tip">
            Enter a title, level, description, content and the tests for the new
            lesson.
          </DialogContentText>
          <FormControl className="add-lesson-dialog-form">
            <TextField
              className="add-lesson-dialog-textfield"
              autoFocus
              required
              fullWidth
              margin="dense"
              id="addTitle"
              name="addTitle"
              label="Title"
              type="text"
              variant="outlined"
            />

            <TextField
              className="add-lesson-dialog-textfield"
              required
              margin="dense"
              id="addDescription"
              name="addDescription"
              label="Description"
              type="text"
              variant="outlined"
            />

            <FormLabel id="add-lesson-dialog-level">Level</FormLabel>
            <RadioGroup
              className="add-lesson-dialog-radio-group"
              aria-labelledby="add-lesson-group-label"
              name="addLevel"
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
            >
              <FormControlLabel
                id="beginner-radio"
                value="beginner"
                control={<Radio />}
                label="Beginner"
              />
              <FormControlLabel
                id="intermediate-radio"
                value="intermediate"
                control={<Radio />}
                label="Intermediate"
              />
              <FormControlLabel
                id="advanced-radio"
                value="advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>

            <TextField
              margin="dense"
              id="add-lesson-dialog-content"
              name="addContent"
              label="Content"
              type="text"
              multiline
              rows={4}
            />

            <div className="add-lesson-tests-wrapper">
              <h2 className="add-lesson-test-title">Review</h2>
              <TextField
                className="add-lesson-dialog-textfield"
                margin="dense"
                id="addQuestion"
                name="addQuestion"
                label="Question"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                className="add-lesson-dialog-textfield add-lesson-dialog-answer"
                margin="dense"
                id="addAnswer"
                name="addAnswer"
                label="Answer"
                type="text"
                fullWidth
                variant="outlined"
              />

              <div className="add-option-wrapper">
                <TextField
                  className="add-lesson-dialog-textfield add-lesson-dialog-option"
                  margin="dense"
                  id="addOption"
                  name="addOption"
                  label="Option"
                  type="text"
                  variant="outlined"
                />
                <button
                  className="add-option-btn"
                  type="button"
                  onClick={handleAddOption}
                >
                  Add option
                </button>
              </div>

              <div className="added-options">
                {options.length > 0 && (
                  <h2 className="added-options-title">Options</h2>
                )}
                {options.map((option, index) => (
                  <div key={index} className="added-option">
                    <p className="added-option-text">
                      {index + 1}: {option}
                    </p>
                    <Tooltip title="Delete Option">
                      <IconButton
                        edge="start"
                        color="error"
                        size="large"
                        aria-label="close"
                        className="delete-option-btn"
                        onClick={() => handleDeleteOption(index)}
                      >
                        <DeleteIcon className="lesson-delete-icon" />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
              </div>

              <button
                className="add-lesson-test-btn"
                type="button"
                onClick={handleAddTest}
              >
                Add test
              </button>

              <div className="added-tests">
                {tests.length > 0 && (
                  <h2 className="added-tests-title">Tests</h2>
                )}
                {tests.map((test, index) => (
                  <div key={index} className="added-test">
                    <p className="added-test-question">
                      {index + 1}: {test.question}
                    </p>
                    <Tooltip title="Delete Test">
                      <IconButton
                        edge="start"
                        color="error"
                        size="large"
                        aria-label="close"
                        className="delete-test-btn"
                        onClick={() => handleDeleteTest(index)}
                      >
                        <DeleteIcon className="lesson-delete-icon" />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className="add-lesson-dialog-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="add-lesson-dialog-btn"
            color="success"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LessonAdd;
