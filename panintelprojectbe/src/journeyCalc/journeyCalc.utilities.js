const check = (routes, cheapest) => {
    let completeRoutes = routes.filter(route => route.complete);
    let currentCheapest = {...cheapest};
    let newRoutes = [];
    if (completeRoutes.length > 1) {
        completeRoutes = completeRoutes.sort((a,b) => a.totalDistance - b.totalDistance);
    }
    if (completeRoutes.length > 0) {
        currentCheapest = currentCheapest.totalDistance < completeRoutes[0] ? 
        {...currentCheapest} : {...completeRoutes[0]};
        newRoutes = routes.filter(route => !route.complete)
        newRoutes = newRoutes.filter(route => route.totalDistance < currentCheapest.totalDistance)

    } 
    
    if (routes.length !== 0 && Object.keys(currentCheapest).length !== 0){
        newRoutes = routes.filter(route => !route.complete)
        newRoutes = newRoutes.filter(route => route.totalDistance < currentCheapest.totalDistance)
    } else {
        newRoutes = [...routes];
    }

    return [newRoutes, currentCheapest];
    
}

const repeater = (flights, routes, finish) => {
    const newRoutes = [];
    const splitFlights = flights
        .map(flight => [flight.match(/[A-Z]/g), flight.split(/[A-Z]/g)[2]]);

    routes.forEach(route => {
        if (route.splitRoute) {
            const options = splitFlights.filter(flight => flight[0][0] === 
                route.splitRoute[route.splitRoute.length - 1][0][1]);
            const potentialRoute = options.map(option => ({
            route: [...route.route, [option[0].join(''), option[1]].join('')],
            splitRoute: [...route.splitRoute, option],
            totalDistance: route.totalDistance + parseInt(option[1]),
            complete: option[0][1] === finish ? true : false,
        }))
        newRoutes.push(...potentialRoute)
        }
    
    });
    return newRoutes
}   

const cheapestRoute = (flights, start, finish) => {
    let routes = [];
    let currentCheapest = {};
    const splitFlights = flights
        .map(flight => [flight.match(/[A-Z]/g), flight.split(/[A-Z]/g)[2]]);

    if (routes.length === 0) {
        routes = splitFlights.filter(flight => flight[0][0] === start)
            .map(route => ({
                route: [[route[0].join(''), route[1]].join('')],
                splitRoute: [route],
                totalDistance: parseInt(route[1]),
                complete: route[0][1] === finish ? true : false,
            }))
    }

    const [newRoutes, newCheapest] = check(routes, currentCheapest);
    routes = [...newRoutes];

    if (Object.keys(newCheapest).length !== 0 ) {
        currentCheapest = {...newCheapest}
    }

    let finished = false;
    while (!finished) {
        
        routes = repeater(flights, routes, finish);
        const [xRoutes, xCheapest] = check(routes, currentCheapest);
        routes = xRoutes;

        if (Object.keys(currentCheapest).length !== 0) {
            if(xCheapest.totalDistance < currentCheapest.totalDistance) {
                currentCheapest = {...xCheapest};
            }
        } else if (Object.keys(xCheapest).length !== 0) {
            currentCheapest = {...xCheapest}
        }

        if(routes.length === 0) {
            finished = true;    
        }

        if(routes.length > flights.length) {
            finished = true;
            currentCheapest = 'There are no available routes'
        }

    }
    
    if ((routes.length === 0) && (Object.keys(currentCheapest) === 0)) {
        currentCheapest = 'There are no available routes';
    }

    return currentCheapest

}

const cheapestTransfer = (vehicles, distance, carPerMile, taxiPerMile, parkingCosts) => {
    const carCost = (vehicles * distance * 2 * carPerMile) + (parkingCosts * vehicles);
    const taxiCost = (vehicles * distance * 2 * taxiPerMile);
    return carCost >= taxiCost ? ['Taxi', taxiCost] : ['Car', carCost];
};

module.exports = {
    check,
    repeater,
    cheapestRoute,
    cheapestTransfer,
}