const connection = require('./connection');

async function deleteFlights() {
    try {
        await connection.connect();
        let bnc = connection.getConnection();
        let flightRegistry = await bnc.getAssetRegistry('org.acme.airline.flight.Flight');
        let allFlights = await flightRegistry.getAll();

        await flightRegistry.removeAll(allFlights);
        console.log('Flights removed successfully.');

        connection.disconnect();
        
    } catch (error) {
        connection.disconnect();
        console.error(error.name, error.message);
    }
}

deleteFlights();