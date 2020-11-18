const journeyCalc = require('../journeyCalc/journeyCalc');

const correctJourneys = [
    {
        vehicle: 'Car',
        vehicleReturnCost: 11.00,
        outboundRoute: ['BF400', 'FD200'],
        outboundCost: 120.00,
        inboundRoute: ['DE300', 'EB500'],
        inboundCost: 160.00,
        totalCost: 291.00,
    },
    {
        vehicle: 'Car',
        vehicleReturnCost: 15.00,
        outboundRoute: ['BF400', 'FD200'],
        outboundCost: 60.00,
        inboundRoute: ['DE300', 'EB500'],
        inboundCost: 80.00,
        totalCost: 155.00,
    },
    {
        inboundCost: 0,
        outboundCost: 280,
        inboundRoute: 'No inbound route',
        outboundRoute: [ 'AB800', 'BF400', 'FD200' ],
        vehicle: 'Car',
        vehicleReturnCost: 11,
        totalCost: 0
    },
] 


describe('JourneyCalc function returns the correct object data', () => {
    it('returns correct data of journey with return flight with one to two stops', () => {
        expect(journeyCalc(2, 'B20', 'D')).toEqual(correctJourneys[0]);
        expect(journeyCalc(1, 'B30', 'D')).toEqual(correctJourneys[1]);
    });
    it('returns correct data when three stops and when there is no inbound or outbound journey', () => {
        expect(journeyCalc(2, 'A20', 'D')).toEqual(correctJourneys[2]);
    })
});