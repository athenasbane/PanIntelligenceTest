const express = require('express');
const journeyCalc = require('./journeyCalc/journeyCalc')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("access-control-allow-methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(express.json());

app.get('/', (req, res) => {
    const { passengers, airportDist, destination } = req.body;
    const data = journeyCalc(passengers, airportDist, destination)
    res.send(data)
    
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`))