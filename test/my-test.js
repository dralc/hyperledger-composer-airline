/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Use this as a template for your own unit test cases
 */
var assert = require('chai').assert;


const utHarness = require('../ut-harness');

// This points to the model project folder
var modelFolder = __dirname + '/../' + 'test-bna';

var adminConnection = {}
/** @type {BusinessNetworkConnection} */
var businessNetworkConnection = {}
var bnDefinition = {}

const nameSpace = 'org.example.biznet';
const resourceName = 'SampleAsset';


// Synchronous call so that connections can be established
before((done) => {
    utHarness.debug = false;
    utHarness.initialize(modelFolder, (adminCon, bnCon, definition) => {
        adminConnection = adminCon;
        businessNetworkConnection = bnCon;
        bnDefinition = definition;
        done();
    });
})


// Test Suite # 1
describe('Add SampleAsset and check', () => {

    // Synchronous
    beforeEach((done) => {
        // Move the initialize here if you would like to 
        // initialize runtime everytime before each test 
        // case
        done()
    });


    /* 
    ADD asset with value
    GET asset value
    ASSERT value
     */
    it('Should add a SampleAsset with value=10', async function () {
        let assId = 'sample-asset-1';
        let bn = businessNetworkConnection.getBusinessNetwork()
        let factory = bn.getFactory();
        let reg = await businessNetworkConnection.getAssetRegistry(nameSpace + '.' + resourceName);
        
        let res = factory.newResource(nameSpace, resourceName, assId, { generate: 'empty' });
        res.value = '10';
        await reg.add(res);

        let asset = await reg.get(assId);

        assert.equal(asset.value, 10, 'Value should be 10');
    });

});


