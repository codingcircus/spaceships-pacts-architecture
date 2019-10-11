const path = require('path');

const config = require('config');

const publishPacts = require('./lib');

publishPacts(path.join(process.cwd(), 'pacts/output'), config.pactTestOptions.pactBrokerUrl);