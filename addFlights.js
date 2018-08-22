const connection = require('./connection');

const NS_FLIGHT = 'org.acme.airline.flight';
const TX_CREATEFLIGHT = 'CreateFlight';

const flights = [
    {
        "flightNumber": "AE104",
        "origin": "EWR",
        "destination": "ATL",
        "schedule": new Date('2020-01-01T01:00Z')
    },
    {
        "flightNumber": "AE105",
        "origin": "EWR",
        "destination": "ATL",
        "schedule": new Date('2020-01-02T02:00Z')
    },
    {
        "flightNumber": "AE106",
        "origin": "EWR",
        "destination": "ATL",
        "schedule": new Date('2020-01-03T03:00Z')
    }
]

/* 
    Populate Flight registry via a transaction
*/
async function addFlight() {
    try {
        await connection.connect();
        let bnc = connection.getConnection();
        let bn = bnc.getBusinessNetwork();
        let factory = bn.getFactory();
        let tx;
        let txs_promises = [];

        flights.forEach((flight) => {
            tx = factory.newTransaction(NS_FLIGHT, TX_CREATEFLIGHT, null, { generate: 'empty' });
            tx.setPropertyValue('flightNumber', flight.flightNumber);
            tx.setPropertyValue('origin', flight.origin);
            tx.setPropertyValue('destination', flight.destination);
            tx.setPropertyValue('schedule', flight.schedule);
            txs_promises.push(bnc.submitTransaction(tx));
        });

        await Promise.all(txs_promises);
        connection.disconnect();

        console.log('All transactions succeeded.');
    } catch (err) {
        console.error(err.name, err.message);
        connection.disconnect();
    }
}

addFlight();
