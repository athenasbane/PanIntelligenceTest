import React from 'react';
import { FormControl, InputLabel, Select, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  formControl: {
    width: '80vw',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f8457a',
      },
    },
    color: 'white',
  },
  select: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f8457a',
      },
    },
  },
});

const Selector = ({ airportData, formData, handleChange, isStart }) => {
  const classes = useStyles();
  const options = airportData.map((airport) => (
    <option key={airport} value={airport}>
      {airport}
    </option>
  ));
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel className={classes.input} color="secondary" id="select-outlined-label">
        {isStart ? 'Starting Airport' : 'Destination'}
      </InputLabel>
      <Select
        className={classes.select}
        native
        inputProps={{ style: { color: 'white', borderLeft: '1px solid #f8457a' } }}
        name={isStart ? 'start' : 'finish'}
        color="secondary"
        labelId="select-outlined-label"
        id="select-outlined"
        label="Starting Airport"
        onChange={(event) => handleChange(event)}
        value={isStart ? formData.start : formData.finish}
      >
        {options}
      </Select>
    </FormControl>
  );
};

Selector.propTypes = {
  airportData: PropTypes.array,
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  isStart: PropTypes.bool,
};

export default Selector;
