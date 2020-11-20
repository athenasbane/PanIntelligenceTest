import React from 'react';
import {
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Button,
    Typography,
} from '@material-ui/core';
import {backendUrl} from '../../constants';
import ResultsModal from '../ResultsModal/ResultsModal';

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
        color: 'white'
        
    },
    button: {
        width: '80vw',
        backgroundColor: '#f8457a',
        color: 'white',
    },
    title: {
        color: 'white'
    },
    select: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f8457a',
            },
        },
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
    const [ resultsModalOpen, setResultsModalOpen ] = React.useState(false);
    const [ airportData, setAirportData ] = React.useState(["A","B","C","D","E","F"]);
    const [ routeData, setRouteData ] = React.useState({});

    const getAirportData = async () => {
        try {
            let response = await fetch(backendUrl + '/airports');
            let data = await response.json();
            setAirportData(['', ...data]);
        } catch (e) {
            console.log(e)
        } 
    };

    const getData = async () => {
        try {
             let response = await fetch(backendUrl, {
                 method: 'POST',
                 headers: {
                    'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(formData),
             });
             let data = await response.json();
             setRouteData(data)
             console.log(data)
         } catch (e) {
             console.log(e)
         } 
     } 

    React.useEffect(() => {
        getAirportData()
    }, [])

    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        getData()
        setResultsModalOpen(true)
    };

    const options = airportData.map((airport) => (
        <option key={airport} value={airport}>{airport}</option>
    ))

    return (
        <Grid container direction="column">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography className={classes.title} variant="h5">Search:</Typography>
                    </Grid>
                    <Grid item >
                        <TextField 
                            InputLabelProps={{style: { color: 'white'}}}
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel className={classes.input} color="secondary" id="select-outlined-label">Starting Airport</InputLabel>
                            <Select
                                className={classes.select}
                                native
                                name="start"
                                color="secondary"
                                labelId="select-outlined-label"
                                id="select-outlined"
                                label="Starting Airport"
                                onChange={(event) => handleChange(event)}
                                value={formData.start}
                            >
                                {options}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField 
                            InputLabelProps={{style: { color: 'white'}}}
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
                        <FormControl className={classes.formControl} variant="outlined" >
                            <InputLabel className={classes.input} color="secondary" id="demo-simple-select-outlined-label">Destination</InputLabel>
                            <Select
                            className={classes.select}
                            native
                            name="finish"
                            color="secondary"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Destination"
                            onChange={(event) => handleChange(event)}
                            value={formData.finish}
                            >
                                {options}
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
                </Grid>
            </form>
            <ResultsModal open={resultsModalOpen} journeyData={formData} resultsData={routeData} close={() => setResultsModalOpen(false)} />
        </Grid>
    );
}

export default Input;