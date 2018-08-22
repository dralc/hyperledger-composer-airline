const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const CARD_NAME = 'admin@airlinev8';
const CARD_TYPE = 'composer-wallet-filesystem';
const Connection = {};
let connection;

/**
 * 
 * @param {*} cardName 
 * @return Promise
 */
Connection.connect = (cardName = CARD_NAME) => {
    connection = new BusinessNetworkConnection({ type: CARD_TYPE });
    return connection.connect(CARD_NAME);
}

Connection.getConnection = () => connection;

Connection.disconnect = () => connection.disconnect()

module.exports = Connection;