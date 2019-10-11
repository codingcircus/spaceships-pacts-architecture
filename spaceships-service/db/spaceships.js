const path = require('path');
const fs = require('fs');

const config = require('config');

let spaceships = [];

function getDBFile () {
  return path.join(__dirname, config.database);
}

function clearTable () {
  writeData([]);
}

function loadData () {
  const data = JSON.parse(fs.readFileSync(getDBFile()));

  return data.spaceships || [];
}

function writeData (updatedSpaceshipsData) {
  const data = JSON.parse(fs.readFileSync(getDBFile()));

  data.spaceships = updatedSpaceshipsData;

  fs.writeFileSync(getDBFile(), JSON.stringify(data));
}

function getItems () {
  return loadData();
}

function getPaginatedItems (itemsPerPage = 10, page = 1) {
  const items = getItems();

  const begin = (page - 1) * itemsPerPage;
  const end = begin + itemsPerPage;

  const slicedItems = items.slice(begin, end);

  return {
    totalItems: items.length,
    itemsPerPage,
    page,
    items: slicedItems,
  };
}

/**
 * Create new spaceship item
 *
 * @param {string} name
 * @param {string} description
 * @param {string} size
 * @return {object}
 */
function createItem (name, description, size) {
  // 1. Read Data
  const data = loadData();

  // 2. Figure out current id
  const currentId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;

  const newItem = {
    id: currentId + 1,
    name,
    description,
    size,
  };

  data.push(newItem);

  writeData(data);

  return newItem;
}

module.exports = {
  clearTable,
  getItems,
  getPaginatedItems,
  createItem,
}