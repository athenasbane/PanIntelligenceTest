// const check = (routes) => {
    //     let newRoutes = [...routes];
    //     let completedRoutes = routes.filter((route) => route.complete === true);
    //     let result = [];
    //     if (completedRoutes.length > 1) {
    //         completedRoutes = completedRoutes.sort((a,b) => a.totalDistance - b.totalDistance)[0];
    //     }
        
    //     if(completedRoutes.length > 0) {
    //         newRoutes = routes.filter(route => route.totalDistance > completedRoutes[0].totalDistance);
    //         result = completedRoutes[0];
    //     }
    //     if(routes.length === 0 && !result) {
    //         result = 'none'
    //     }
    //     console.log('check', [newRoutes, completedRoutes, result])
    //     return [newRoutes, completedRoutes, result]
    // };

    // const check = (routes, current) => {
    //     let newRoutes = [...routes];
    //     let result = {};
    //     let completedRoutes = routes.filter((route) => {
    //         if(route.complete) {
    //             return route
    //         }
    //     })
        
    // }

    // const repeater = (routes, finish) => {
    //     newRoutes = [];
    //     routes.forEach(route => {
    //         if (route.splitRoute) {
    //             const options = splitFlights.filter(flight => flight[0][0] === route.splitRoute[route.splitRoute.length - 1][0][1]);
    //             const potentialRoute = options.map(option => ({
    //             route: [...route.route, [option[0].join(''), option[1]].join('')],
    //             splitRoute: [...route.splitRoute, option],
    //             totalDistance: route.totalDistance + parseInt(option[1]),
    //             complete: option[0][1] === finish ? true : false,
    //         }))
    //         newRoutes.push(potentialRoute);
    //         }
            
    //     });
    //     console.log('Repeater', newRoutes)
    //     return newRoutes
    // }

    // const cheapestRoute = (start, finish) => {
    //     let routes = [];
    //     let result = {};

    //     if (routes.length === 0) {
    //         splitFlights.filter(flight => flight[0][0] === start).forEach((route, i) => {
    //             routes[i] = {
    //                 route: [[route[0].join(''), route[1]].join('')],
    //                 splitRoute: [route],
    //                 totalDistance: parseInt(route[1]),
    //                 complete: route[0][1] === finish ? true : false,
    //             }
    //         })
    //         routes = check(routes)[0]
    //         result = check(routes)[2]
    //     }

    //     while (routes.length > 1) {
    //         routes = repeater(routes, finish)
    //         // check()
    //     }
        
    //     return result
    // };

    const check = (routes) => {
        //current routes
        let newRoutes = [...routes];
        let finished = false;
        
        // all completed routes
        let completedRoutes = newRoutes.filter(route => route.complete === true);

        // if more than one completed route sort so completed route is at index 0
        if (completedRoutes.length > 1) {
            completedRoutes.sort((a, b) => a.totalDistance - b.totalDistance)
        }

        // if there are any completed routes remove any completed routes or incomplete routes with a
        // greater distance than the completed route at index 0 && remove completed route
        if (completedRoutes.length > 0) {
            newRoutes = routes.filter(route => {
                if ((route.totalDistance < completedRoutes[0].totalDistance) && !route.complete) {
                    return true;
                }
            })
        }

        if(newRoutes === 0) {
            finished = true;
        }
        
        return [newRoutes, completedRoutes[0], finished]
        // return the routes and the completed route at index 0
    }

    const repeater = (routes, finish) => {
        newRoutes = [];
        routes.forEach(route => {
            if (route.splitRoute) {
                const options = splitFlights.filter(flight => flight[0][0] === route.splitRoute[route.splitRoute.length - 1][0][1]);
                const potentialRoute = options.map(option => ({
                route: [...route.route, [option[0].join(''), option[1]].join('')],
                splitRoute: [...route.splitRoute, option],
                totalDistance: route.totalDistance + parseInt(option[1]),
                complete: option[0][1] === finish ? true : false,
            }))
            console.log('potential route', ...potentialRoute)
            newRoutes.push(...potentialRoute)
            }
        
    });
        console.log('repeater 2', newRoutes)
        return newRoutes
    }   

    const cheapestRoute = (start, finish) => {
        let routes = [];
        let cheapest = {};

        // repeater function that repeats and checks until none are left. 
        
        if (routes.length === 0) {
            routes = splitFlights.filter(flight => flight[0][0] === start)
                .map(route => ({
                    route: [[route[0].join(''), route[1]].join('')],
                    splitRoute: [route],
                    totalDistance: parseInt(route[1]),
                    complete: route[0][1] === finish ? true : false,
                }))
        
            const [newRoutes, newCheap] = check(routes);
            
            routes = newRoutes;
            cheapest = newCheap;
        }
        // while loop
        while (routes.length > 0) {
            routes = repeater(routes, finish);
            const [newRoutes, newCheapest] = check(routes);
            routes = newRoutes;
            console.log('Loop', newRoutes, newCheapest)
            if (newCheapest && cheapest) {
                if (newCheapest.totalDistance < cheapest.totalDistance ) {
                    cheapest = newCheapest
                }
            }
        }

        if (!cheapest) {
            return 'No Route'
        }

        return cheapest
        
    }