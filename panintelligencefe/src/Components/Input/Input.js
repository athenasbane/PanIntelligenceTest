import React from 'react';
import {
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        width: '80vw',
    },
    button: {
        width: '80vw',
        backgroundColor: '#f8457a',
        color: 'white',
    }
});

const Input = () => {
    const classes = useStyles();
    
    const [formData, setFormData] = React.useState({
        passengers: '',
        start: '',
        finish: '',
        disToAirport: '',
    });
    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };
    const handleSubmit = () => {

    };
    return (
        <Grid container>
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <TextField 
                        name="passengers" 
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Starting Airport</InputLabel>
                        <Select
                        name="start"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Starting Airport"
                        onChange={(event) => handleChange(event)}
                        value={formData.start}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField 
                        name="disToAirport" 
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Destination</InputLabel>
                        <Select
                        name="finish"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Destination"
                        onChange={(event) => handleChange(event)}
                        value={formData.finish}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button 
                        disabled={!Object.values(formData).every(el => el !== '')}
                        type="submit" 
                        className={classes.button} 
                        variant="contained"><strong>Submit</strong></Button>
                </Grid>
            </form>
        </Grid>
    );
}

export default Input;