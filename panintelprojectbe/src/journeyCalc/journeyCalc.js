const { 
    PEOPLE_PER_VEHICLE, 
    TAXI_PER_MILE, 
    CAR_PER_MILE, 
    CAR_PARKING_COSTS, 
    FLIGHTS } = require('./journeyCalc.constants');

const { cheapestRoute, cheapestTransfer } = require('./journeyCalc.utilities');

const journeyCalc = (passengers, homeToAirport, destination) => {

    const splitFlights = FLIGHTS.map(flight => [flight.match(/[A-Z]/g), flight.split(/[A-Z]/g)[2]]);

    const noVehicles = Math.floor(passengers / PEOPLE_PER_VEHICLE) + (passengers % PEOPLE_PER_VEHICLE === 0 ? 0 : 1);
    const [ airport ] = homeToAirport.match(/[A-Z]/);
    const [ _, distanceToAirport ] = homeToAirport.split(/[A-Z]/);
    const [vehicle, vehicleReturnCost] = 
        cheapestTransfer(noVehicles, distanceToAirport, CAR_PER_MILE, TAXI_PER_MILE, CAR_PARKING_COSTS);

    const outbound = cheapestRoute(FLIGHTS, airport, destination);
    const inbound = cheapestRoute(FLIGHTS, destination, airport);

    return {
        inboundCost: typeof(inbound) === 'object' ? 
            (inbound.totalDistance * 0.1) * passengers : 0,
        outboundCost: typeof(outbound) === 'object' ? 
            (outbound.totalDistance * 0.1) * passengers : 0,
        inboundRoute: typeof(inbound) === 'object' ? 
            inbound.route : 'No inbound route',
        outboundRoute: typeof(outbound) === 'object' ? 
            outbound.route : 'No outbound route',
        vehicle,
        vehicleReturnCost,
        totalCost: typeof(inbound) === 'object' && typeof(outbound) === 'object' ? 
            (inbound.totalDistance * 0.1 * passengers) + 
            (outbound.totalDistance * 0.1 * passengers) + vehicleReturnCost : 0,
    }
}

module.exports = journeyCalc