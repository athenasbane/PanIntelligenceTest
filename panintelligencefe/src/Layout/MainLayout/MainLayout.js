import React from 'react';
import { Grid, makeStyles, Paper, Typography, Slide } from '@material-ui/core';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import Input from '../../Components/Input/Input';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundColor: '#182233',
    backgroundImage:
      'url(https://www.panintelligence.com/wp-content/uploads/2020/09/home-bars.svg)',
  },
  nav: {
    height: '10vh',
  },
  title: {
    color: '#f8457a',
  },
  titleTwo: {
    color: '#d81251',
  },
  paper: {
    width: '100vw',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#222c3c',
  },
  inputPaper: {
    padding: '10px',
    backgroundColor: '#222c3c',
    border: '2px solid #f8457a',
    position: 'absolute',
    top: '26%',
  },
  icon: {
    color: 'white',
    width: '30px',
    height: '30px',
    margin: '10px',
  },
});

const MainLayout = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container justify="center">
      <Grid className={classes.nav} container item xs="auto">
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography className={classes.title} variant="h3">
                <strong>Pan</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Slide direction="up" in timeout={1000}>
                <AirplanemodeActiveIcon className={classes.icon} />
              </Slide>
            </Grid>
            <Grid item>
              <Typography className={classes.titleTwo} variant="h3">
                Travel
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid container item xs={8} justify="center">
        <Paper className={classes.inputPaper}>
          <Input />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
