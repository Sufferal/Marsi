import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Tooltip } from "@mui/material";
import "../../css/lesson/LessonEdit.css";
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
import { ThemeContext } from "../../context/ThemeContext";

const LessonEdit = ({ lesson, updateLesson }) => {
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(lesson.level);
  const [tests, setTests] = useState(lesson.tests);
  const [options, setOptions] = useState(lesson.tests.options || []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formElement = document.getElementById("edit-lesson-form");
    const formData = new FormData(formElement);
    const formJson = Object.fromEntries(formData.entries());
    const { editTitle, editDescription, editLevel, editContent } = formJson;

    if (
      !editTitle ||
      !editLevel ||
      !editDescription ||
      !editContent ||
      tests.length === 0
    ) {
      alert("Please fill in all fields and ensure there is at least one test.");
      return;
    }

    const updatedLesson = {
      id: lesson.id,
      title: editTitle,
      level: editLevel,
      description: editDescription,
      score: lesson.score,
      content: editContent.split("\n"),
      tests: tests,
    };

    handleClose();
    console.log(updatedLesson);
    updateLesson(updatedLesson);
    formElement.reset();
  };

  const handleEditOption = () => {
    const optionsInput = document.getElementById("editOption").value;

    if (!optionsInput) {
      alert("Please make sure the option is not empty.");
      return;
    }

    setOptions([...options, optionsInput]);
    document.getElementById("editOption").value = "";
  };

  const handleEditTest = () => {
    const questionInput = document.getElementById("editQuestion").value;
    const answerInput = document.getElementById("editAnswer").value;

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

    // Clear the input fields after editing the test
    document.getElementById("editQuestion").value = "";
    document.getElementById("editAnswer").value = "";
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

  const { color } = React.useContext(ThemeContext);

  return (
    <div className="lesson-edit">
      <Tooltip title="Edit Lesson">
        <IconButton
          edge="start"
          color="info"
          size="large"
          aria-label="close"
          className="dialog-close-button"
          onClick={handleClickOpen}
        >
          <EditNoteIcon className="lesson-edit-icon" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          id: "edit-lesson-form",
          style: {
            backgroundColor: color,
          },
        }}
      >
        <DialogTitle className="edit-lesson-dialog-title">
          Edit a lesson
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="edit-lesson-dialog-tip">
            Update the title, level, description, content and the tests for the
            existing lesson.
          </DialogContentText>
          <FormControl className="edit-lesson-dialog-form">
            <TextField
              className="edit-lesson-dialog-textfield"
              autoFocus
              required
              fullWidth
              margin="dense"
              id="editTitle"
              name="editTitle"
              label="Title"
              type="text"
              variant="outlined"
              defaultValue={lesson.title}
            />

            <TextField
              className="edit-lesson-dialog-textfield"
              required
              margin="dense"
              id="editDescription"
              name="editDescription"
              label="Description"
              type="text"
              variant="outlined"
              defaultValue={lesson.description}
            />

            <FormLabel id="edit-lesson-dialog-level">Level</FormLabel>
            <RadioGroup
              className="edit-lesson-dialog-radio-group"
              aria-labelledby="edit-lesson-group-label"
              name="editLevel"
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
              id="edit-lesson-dialog-content"
              name="editContent"
              label="Content"
              type="text"
              multiline
              rows={4}
              defaultValue={lesson.content.join("\n")}
            />

            <div className="edit-lesson-tests-wrapper">
              <h2 className="edit-lesson-test-title">Review</h2>
              <TextField
                className="edit-lesson-dialog-textfield"
                margin="dense"
                id="editQuestion"
                name="editQuestion"
                label="Question"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                className="edit-lesson-dialog-textfield edit-lesson-dialog-answer"
                margin="dense"
                id="editAnswer"
                name="editAnswer"
                label="Answer"
                type="text"
                fullWidth
                variant="outlined"
              />

              <div className="edit-option-wrapper">
                <TextField
                  className="edit-lesson-dialog-textfield edit-lesson-dialog-option"
                  margin="dense"
                  id="editOption"
                  name="editOption"
                  label="Option"
                  type="text"
                  variant="outlined"
                />
                <button
                  className="edit-option-btn"
                  type="button"
                  onClick={handleEditOption}
                >
                  Add option
                </button>
              </div>

              <div className="edited-options">
                {options.length > 0 && (
                  <h2 className="edited-options-title">Options</h2>
                )}
                {options.map((option, index) => (
                  <div key={index} className="edited-option">
                    <p className="edited-option-text">
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
                className="edit-lesson-test-btn"
                type="button"
                onClick={handleEditTest}
              >
                Add test
              </button>

              <div className="edited-tests">
                {tests.length > 0 && (
                  <h2 className="edited-tests-title">Tests</h2>
                )}
                {tests.map((test, index) => (
                  <div key={index} className="edited-test">
                    <p className="edited-test-question">
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
          <Button className="edit-lesson-dialog-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="edit-lesson-dialog-btn"
            color="success"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LessonEdit;
