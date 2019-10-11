const {Verifier} = require('@pact-foundation/pact');
const config = require('config');

const db = require('../db');
const server = require('../server');

server.listen(config.server.port, config.server.host, () => {
  console.log(`Started server for provider testing at http://${config.server.host}:${config.server.port}`);
});

const stateHandlers = {
  "there is a spaceship with id 1 in the database": () => {
    console.log('Clearing Spaceship Table');
    db.spaceships.clearTable();
    console.log('Creating default entry');
    db.spaceships.createItem('New spaceship', 'Some description', 'small');
    return Promise.resolve('Spaceships table is reset to one entry');
  }
}

describe('Pact Verification', () => {
  it('can validate all published pacts where spaceship-service is provider', () => {
    const opts = {
      providerBaseUrl: `http://${config.server.host}:${config.server.port}`,
      provider: 'spaceships-service',
      providerVersion: '0.1.0',
      pactBrokerUrl: 'http://pacts.spaceships.site/',
      publishVerificationResult: true,
      stateHandlers,
    }

    return new Verifier(opts).verifyProvider()
      .then(() => {
        console.log('Finalized provider verification');
      });
  })
})
