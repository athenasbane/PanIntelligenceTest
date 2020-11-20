import React from 'react';
import { makeStyles, Grid, Typography, Paper } from '@material-ui/core';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@material-ui/icons/AirplanemodeInactive';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  text: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  icon: {
    color: '#f8457a',
    width: '30px',
    height: '30px',
    paddingLeft: '2px',
    paddingTop: '1px',
  },
  iconBackground: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
  },
});

const Flight = ({ isMobile, resultsData, flight }) => {
  const {
    inboundCost = 0,
    inboundRoute = [''],
    outboundCost = 0,
    outboundRoute = [''],
  } = resultsData;

  const classes = useStyles();

  const activeIcon = (
    <Paper className={classes.iconBackground}>
      <AirplanemodeActiveIcon className={classes.icon} />
    </Paper>
  );

  const inactiveIcon = (
    <Paper className={classes.iconBackground}>
      <AirplanemodeInactiveIcon className={classes.icon} />
    </Paper>
  );

  const route = () => {
    const error = (
      <Typography className={classes.errorText}>
        Unfortuately there is no route between those destinations
      </Typography>
    );
    if (flight === 'Outbound') {
      if (outboundRoute === 'No outbound route') {
        return error;
      }
      return (
        <Typography className={classes.text}>
          {flight === 'Outbound' ? outboundRoute.join('-') : inboundRoute.join('-')}
        </Typography>
      );
    }

    if (inboundRoute === 'No inbound route') {
      return error;
    }
    return (
      <Typography className={classes.text}>
        {flight === 'Outbound' ? outboundRoute.join('-') : inboundRoute.join('-')}
      </Typography>
    );
  };

  const icon = () => {
    if (flight === 'Outbound') {
      if (outboundRoute === 'No outbound route') {
        return inactiveIcon;
      }
      return activeIcon;
    }

    if (inboundRoute === 'No inbound route') {
      return inactiveIcon;
    }
    return activeIcon;
  };

  const cost = () => {
    if (flight === 'Outbound') {
      if (outboundRoute === 'No outbound route') {
        return null;
      }
      return `Flight Price: £ ${outboundCost.toFixed(2)}`;
    }

    if (inboundRoute === 'No inbound route') {
      return null;
    }
    return `Flight Price: £ ${inboundCost.toFixed(2)}`;
  };

  return (
    <Grid container item direction={isMobile} justify="center" alignItems="center" spacing={1}>
      <Grid item md={1}>
        {icon()}
      </Grid>
      <Grid item md={4}>
        <Typography className={classes.text}>
          <strong>Your {flight} Flight</strong>
        </Typography>
      </Grid>
      <Grid item md={4}>
        {route()}
      </Grid>
      <Grid item>
        <Typography className={classes.text} variant="h6">
          {cost()}
        </Typography>
      </Grid>
    </Grid>
  );
};

Flight.propTypes = {
  isMobile: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  resultsData: PropTypes.object,
  inboundCost: PropTypes.number,
  inboundRoute: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  outboundCost: PropTypes.number,
  outboundRoute: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  flight: PropTypes.string,
};

export default Flight;
