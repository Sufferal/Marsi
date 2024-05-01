import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../../css/lesson/LessonQuestion.css';

const LessonQuestion = ({ question, options }) => {
  return (
    <FormControl>
      <FormLabel id="test-group-label">{question}</FormLabel>
      <RadioGroup
        aria-labelledby="test-group-label"
        name="test-buttons-group"
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default LessonQuestion;
