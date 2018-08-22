const connection = require('./connection');
const NS_AIRCRAFT = 'org.acme.airline.aircraft';
const AS_AIRCRAFT = 'Aircraft';

const aircrafts = [
    {
        "aircraftId": "aircraft01",
        "firstClassSeats": 4,
        "businessClassSeats": 6,
        "economyClassSeats": 30
    },
    {
        "aircraftId": "aircraft02",
        "firstClassSeats": 5,
        "businessClassSeats": 7,
        "economyClassSeats": 31
    },
    {
        "aircraftId": "aircraft03",
        "firstClassSeats": 6,
        "businessClassSeats": 8,
        "economyClassSeats": 32
    }
]

// Populate Aircraft registry
async function addAircraft() {
    try {
        await connection.connect();
        let bnc = connection.getConnection();

        let aircraftRegistry = await bnc.getAssetRegistry(`${NS_AIRCRAFT}.${AS_AIRCRAFT}`);

        let bn = bnc.getBusinessNetwork();
        let factory = bn.getFactory();
        let newAircrafts = [];
        let rs;

        aircrafts.forEach((aircraft) => {
            rs = factory.newResource(NS_AIRCRAFT, AS_AIRCRAFT, aircraft.aircraftId, { generate: 'empty' });
            rs.setPropertyValue('aircraftId', aircraft.aircraftId);
            rs.setPropertyValue('firstClassSeats', aircraft.firstClassSeats);
            rs.setPropertyValue('businessClassSeats', aircraft.businessClassSeats);
            rs.setPropertyValue('economyClassSeats', aircraft.economyClassSeats);
            newAircrafts.push(rs);
        });

        await aircraftRegistry.addAll(newAircrafts);
        connection.disconnect();
        console.log('Aircrafts successfully added.');
        
    } catch (err) {
        console.error(err.name, err.message);
        connection.disconnect();
    }

}

addAircraft();