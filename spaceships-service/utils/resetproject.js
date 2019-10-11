const fs = require('fs');
const path = require('path');

const axios = require('axios');

const {spaceships} = require('../db/index');

// Reset DB
spaceships.clearTable();
spaceships.createItem('Tardis', 'A police booth that travels through space and time', 'small');
spaceships.createItem('USS Enterprise', 'Live long and propser', 'large');
spaceships.createItem('Lego Spaceship', 'SPACESHIP!!!', 'medium');
spaceships.createItem('Sanctuary II', 'Inevitable', 'large');

// Reset Handlers File to not have paginated middleware
const contentHandlersBackup = fs.readFileSync(path.join(__dirname, 'backup/handlers.js'));
fs.writeFileSync(path.join(process.cwd(), 'routes/spaceships/handlers.js'), contentHandlersBackup);

// Reset interactions and testfile in viewer app
const contentInteractionsViewerBackup = fs.readFileSync(path.join(__dirname, 'backup/spaceships.interactions.js'));
fs.writeFileSync(path.join(process.cwd(), '../spaceships-viewer/routes/common/spaceships.interactions.js'), contentInteractionsViewerBackup);
const contentSpecViewerBackup = fs.readFileSync(path.join(__dirname, 'backup/handlers.spec.js'));
fs.writeFileSync(path.join(process.cwd(), '../spaceships-viewer/routes/common/handlers.spec.js'), contentSpecViewerBackup);

// Delete pacts on broker
axios.delete('http://pacts.spaceships.site/integrations/provider/spaceships-service/consumer/spaceship-viewer')
  .then(({status}) => {
    console.log(`Status: ${status} - Deleted Spaceships Viewer Pacts`);
  })
  .catch(err => {
    console.log(err);
    return err;
  });

axios.delete('http://pacts.spaceships.site/integrations/provider/spaceships-service/consumer/spaceship-creator-app')
  .then(({status}) => {
    console.log(`Status: ${status} - Deleted Spaceships Viewer Pacts`);
  })
  .catch(err => {
    console.log(err);
    return err;
  });

// Delete pacts in folder
fs.unlinkSync(path.join(process.cwd(), '../spaceships-viewer/pacts/output/spaceship-viewer-spaceships-service.json'))
fs.unlinkSync(path.join(process.cwd(), '../spaceship-creator-app/pacts/output/spaceship-creator-app-spaceships-service.json'));
