import React from 'react';
import { Grid, makeStyles, TextField, Button, Typography } from '@material-ui/core';
import { backendUrl } from '../../constants';
import ResultsModal from '../ResultsModal/ResultsModal';
import Selector from './Selector';
import ErrorModal from './ErrorModal';

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
  button: {
    width: '80vw',
    backgroundColor: '#f8457a',
    color: 'white',
  },
  title: {
    color: 'white',
  },
});

const Input = () => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    passengers: '',
    start: '',
    finish: '',
    disToAirport: '',
  });
  const [resultsModalOpen, setResultsModalOpen] = React.useState(false);
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [airportData, setAirportData] = React.useState(['A', 'B', 'C', 'D', 'E', 'F']);
  const [routeData, setRouteData] = React.useState({});

  const getAirportData = async () => {
    try {
      const response = await fetch(`${backendUrl}/airports`);
      const data = await response.json();
      setAirportData(['', ...data]);
    } catch (e) {
      setErrorModalOpen(true);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setRouteData(data);
    } catch (e) {
      setErrorModalOpen(true);
    }
  };

  React.useEffect(() => {
    getAirportData();
  }, []);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setResultsModalOpen(true);
  };

  return (
    <Grid container direction="column">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography className={classes.title} variant="h5">
              Search:
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' }, min: 1 }}
              className={classes.input}
              name="passengers"
              color="secondary"
              type="number"
              fullWidth
              id="outlined-basic"
              label="Number of Passengers"
              variant="outlined"
              onChange={(event) => handleChange(event)}
              value={formData.passengers}
            />
          </Grid>
          <Grid item>
            <Selector
              airportData={airportData}
              formData={formData}
              handleChange={handleChange}
              isStart
            />
          </Grid>
          <Grid item>
            <TextField
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' }, min: 1 }}
              className={classes.input}
              name="disToAirport"
              color="secondary"
              type="number"
              fullWidth
              id="outlined-basic"
              label="Miles to Airport"
              variant="outlined"
              onChange={(event) => handleChange(event)}
              value={formData.disToAirport}
            />
          </Grid>
          <Grid item>
            <Selector
              airportData={airportData}
              formData={formData}
              handleChange={handleChange}
              isStart={false}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!Object.values(formData).every((el) => el !== '')}
              type="submit"
              className={classes.button}
              variant="contained"
            >
              <strong>Submit</strong>
            </Button>
          </Grid>
        </Grid>
      </form>
      <ResultsModal
        open={resultsModalOpen}
        resultsData={routeData}
        close={() => setResultsModalOpen(false)}
      />
      <ErrorModal open={errorModalOpen} />
    </Grid>
  );
};

export default Input;
