import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../../css/lesson/LessonQuestion.css';

const LessonQuestion = ({ question, options, opOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    opOptionChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="test-group-label">{question}</FormLabel>
      <RadioGroup
        className="test-buttons-group"
        aria-labelledby="test-group-label"
        name="test-buttons-group"
        value={selectedOption}
        onChange={handleOptionChange}
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
