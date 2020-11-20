import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
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
    top: 220,
  },
});

const MainLayout = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container justify="center">
      <Grid className={classes.nav} container item xs="auto">
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h3">
            <strong>Pan</strong>Travel
          </Typography>
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
