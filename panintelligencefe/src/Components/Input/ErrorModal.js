import React from 'react';
import { makeStyles, Modal, Paper, Grid, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    top: 60,
    left: '9%',
    width: '80vw',
    height: '80vh',
    backgroundColor: 'red',
    padding: '5px',
    border: '2px solid white',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  icon: {
    color: 'white',
    width: '80px',
    height: '80px',
  },
  iconBackground: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
  },
  closeButton: {
    position: 'absolute',
    top: -30,
    right: -25,
  },
});

const ErrorModal = ({ open, close }) => {
  const classes = useStyles();
  const body = (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography className={classes.text} variant="h4">
            Oh No!
          </Typography>
        </Grid>
        <Grid item>
          <ErrorOutlineIcon className={classes.icon} />
        </Grid>
        <Grid item>
          <Typography className={classes.text} variant="h5">
            Something went very wrong. Please refresh the page or try again later!
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="search-results"
      aria-describedby="results-of-travel-search"
    >
      {body}
    </Modal>
  );
};

ErrorModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default ErrorModal;
