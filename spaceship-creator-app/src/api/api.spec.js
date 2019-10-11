/**
 * @jest-environment node
 */
const path = require('path');
const config = require('config');
const {Pact, Matchers} = require('@pact-foundation/pact');
const getInteractions = require('./spaceships.interactions');

import {getSpaceships, postSpaceship} from './index';

describe('Create Pacts for spaceships-service', () => {
  // 1. Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: 'spaceship-creator-app',
    provider: 'spaceships-service',
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts/output"),
    logLevel: "INFO",
  });

  beforeAll((done) => {
    const interactions = getInteractions(Matchers);
    provider
      .setup()
      .then(() => {
        interactions.map(({interaction}) => provider.addInteraction(interaction));
        done();
      });
  });

  describe('Interactions', () => {
    it('can get data about at least one spaceship', async () => {
      const response = await getSpaceships();

      // This test is not necessary
      expect(response[0].id).toEqual(1);
    });

    it('can create a new spaceship', async () => {
      const response = await postSpaceship({
        name: 'new spaceship',
        description: 'data about new spaceship',
        size: 'medium',
      });

      expect(response.id).toEqual(1);
    });
  });

  afterAll(async () => {
    await provider.verify();
    await provider.finalize();
  });
})