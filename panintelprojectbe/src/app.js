const express = require('express');
const journeyCalc = require('./journeyCalc/journeyCalc');
const { FLIGHTS } = require('./journeyCalc/journeyCalc.constants');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const {
      passengers, start, finish, disToAirport,
    } = req.body;
    const airportDist = `${start}${disToAirport}`;
    const data = journeyCalc(passengers, airportDist, finish);

    const dataify = (journeyData) => {
      const {
        inboundCost, outboundCost, inboundRoute, outboundRoute, vehicle, vehicleReturnCost, totalCost,
      } = journeyData;

      const result = {};

      switch (inboundCost) {
        case 0: {
          result.inboundCost = {
            style: 'error', direction: 'Inbound', icon: 'noflight', cost: 0, route: null,
          };
          break;
        }
        default: {
          return {
            style: 'found', direction: 'Inbound', icon: 'flight', cost: inboundCost, route: inboundRoute.join('-'),
          };
        }
      }
    };

    res.status(200).send(data);
  } catch (e) {
    res.status(500);
  }
});

app.get('/airports', async (req, res) => {
  try {
    const airports = [...new Set(FLIGHTS.map((flight) => flight.match(/[A-Z]/g)).flat())];
    res.status(200).send(airports);
  } catch (e) {
    res.status(500);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`));
