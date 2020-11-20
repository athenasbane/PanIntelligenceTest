const {
  check,
  repeater,
  cheapestRoute,
  cheapestTransfer,
} = require('../journeyCalc/journeyCalc.utilities');

const { FLIGHTS } = require('../journeyCalc/journeyCalc.constants');

const TEST_ROUTES_1 = [{
  route: ['BC900', 'CE200'],
  splitRoute: [[['B', 'C'], 900], [['C', 'E'], 200]],
  totalDistance: 1100,
  complete: true,
},
{
  route: ['BF400', 'FD200'],
  splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200]],
  totalDistance: 600,
  complete: false,
}];

const TEST_ROUTES_2 = [{
  route: ['BC900', 'CE200'],
  splitRoute: [[['B', 'C'], 900], [['C', 'E'], 200]],
  totalDistance: 1100,
  complete: false,
},
{
  route: ['BF400', 'FD200'],
  splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200]],
  totalDistance: 600,
  complete: false,
}];

const TEST_ROUTES_3 = [{
  route: ['BC900', 'CE200', 'EB600'],
  splitRoute: [[['B', 'C'], 900], [['C', 'E'], 200], [['E', 'B'], '600']],
  totalDistance: 1700,
  complete: true,
}, {
  route: ['BC900', 'CE200', 'EB500'],
  splitRoute: [[['B', 'C'], 900], [['C', 'E'], 200], [['E', 'B'], '500']],
  totalDistance: 1600,
  complete: true,
}, {
  route: ['BF400', 'FD200', 'DE400'],
  splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200], [['D', 'E'], '400']],
  totalDistance: 1000,
  complete: false,
}, {
  route: ['BF400', 'FD200', 'DE300'],
  splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200], [['D', 'E'], '300']],
  totalDistance: 900,
  complete: false,
}, {
  route: ['BF400', 'FD200', 'DC700'],
  splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200], [['D', 'C'], '700']],
  totalDistance: 1300,
  complete: false,
}];

const CHEAPEST = {
  route: ['BC900'],
  splitRoute: [[['B', 'C'], '900']],
  totalDistance: 900,
  complete: true,
};

describe('Check function outputs correctly', () => {
  it('finds the route that is complete and removes it from routes', () => {
    expect(check(TEST_ROUTES_1, {})).toEqual([[{
      route: ['BF400', 'FD200'],
      splitRoute: [[['B', 'F'], 400], [['F', 'D'], 200]],
      totalDistance: 600,
      complete: false,
    }], {
      route: ['BC900', 'CE200'],
      splitRoute: [[['B', 'C'], 900], [['C', 'E'], 200]],
      totalDistance: 1100,
      complete: true,
    }]);
  });
  it('just returns original routes if no completed route found', () => {
    expect(check(TEST_ROUTES_2)).toEqual([[
      ...TEST_ROUTES_2,
    ], {}]);
  });
  it('accepts a completed route and makes returns it if no completed routes are greater', () => {
    expect(check(TEST_ROUTES_2, TEST_ROUTES_1[0])).toEqual([[TEST_ROUTES_1[1]], TEST_ROUTES_1[0]]);
  });
});

describe('repeater function outputs correct result', () => {
  it('adds any possible nextstep to the routes and recognises complete routes', () => {
    expect(repeater(FLIGHTS, TEST_ROUTES_2, 'B')).toEqual([...TEST_ROUTES_3]);
  });
});

describe('cheapestRoute function outputs the cheapest route', () => {
  it('finds cheapest', () => {
    expect(cheapestRoute(FLIGHTS, 'B', 'C')).toEqual(CHEAPEST);
  });
  it('recognises when there is no route', () => {
    expect(cheapestRoute(FLIGHTS, 'A', 'A')).toEqual('There are no available routes');
  });
});

describe('cheapestTransfer function works correctly', () => {
  it('finds the cheapest and the cost', () => {
    expect(cheapestTransfer(2, 10, 0.2, 0.4, 3)).toEqual(['Car', 14]);
  });
});
