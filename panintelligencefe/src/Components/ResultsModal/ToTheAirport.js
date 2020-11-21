import React from 'react';
import { makeStyles, Grid, Typography, Paper } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
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
});

const ToTheAirport = ({ isMobile, resultsData }) => {
  const classes = useStyles();
  return (
    <Grid container item direction={isMobile} justify="center" alignItems="center" spacing={1}>
      <Grid item md={1}>
        {resultsData.vehicle === 'Car' ? (
          <Paper className={classes.iconBackground}>
            <DriveEtaIcon className={classes.icon} />
          </Paper>
        ) : (
          <Paper className={classes.iconBackground}>
            <LocalTaxiIcon className={classes.icon} />
          </Paper>
        )}
      </Grid>
      <Grid item md={4}>
        <Typography className={classes.text}>
          <strong>Getting To The Airport and Back</strong>
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography className={classes.text}>
          The cheapest option is by {resultsData.vehicle}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text} variant="h6">
          {resultsData.vehicleReturnCost
            ? `Cost: £ ${resultsData.vehicleReturnCost.toFixed(2)}`
            : null}
        </Typography>
      </Grid>
    </Grid>
  );
};

ToTheAirport.propTypes = {
  isMobile: PropTypes.string,
  resultsData: PropTypes.object,
  vehicle: PropTypes.string,
  vehicleReturnCost: PropTypes.string,
};

export default ToTheAirport;
