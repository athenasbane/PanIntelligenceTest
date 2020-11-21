import React from 'react';
import { Modal, Grid, Typography, makeStyles, Paper, Fab } from '@material-ui/core';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import ToTheAirport from './ToTheAirport';
import Flight from './Flight';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    top: 60,
    left: '9%',
    width: '80vw',
    height: '80vh',
    backgroundColor: '#222c3c',
    padding: '5px',
    border: '2px solid white',
  },
  text: {
    color: 'white',
  },
  icon: {
    color: '#f8457a',
    width: '30px',
    height: '30px',
    paddingLeft: '2px',
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

const isMobile = window.screen.width > 400 ? 'row' : 'column';

const ResultsModal = ({ open, close, resultsData }) => {
  const classes = useStyles();
  const body = (
    <Paper className={classes.paper}>
      <Fab className={classes.closeButton} onClick={close} color="secondary" aria-label="close">
        <CancelIcon />
      </Fab>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Typography className={classes.text} variant="h5">
            <strong>Your Travel Plan</strong>
          </Typography>
        </Grid>
        <ToTheAirport resultsData={resultsData} isMobile={isMobile} />
        <Grid item xs={11}>
          <hr />
        </Grid>
        <Flight resultsData={resultsData} flight="Outbound" isMobile={isMobile} />
        <Grid item xs={11}>
          <hr />
        </Grid>
        <Flight resultsData={resultsData} flight="Inbound" isMobile={isMobile} />
        <Grid item xs={11}>
          <hr />
        </Grid>
        <Typography className={classes.text} variant="h5">
          Total Cost: £ {resultsData.totalCost?.toFixed(2)}
        </Typography>
      </Grid>
    </Paper>
  );

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={close}
      aria-labelledby="search-results"
      aria-describedby="results-of-travel-search"
    >
      {body}
    </Modal>
  );
};

ResultsModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  resultsData: PropTypes.object,
};

export default ResultsModal;
