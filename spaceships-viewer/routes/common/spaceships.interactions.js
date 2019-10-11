module.exports = (Matchers) => {

  // This interaction describes the api request to fetch data about spaceships
  const getSpaceshipInteraction = {
    consumer: 'spaceship-viewer',
    provider: 'spaceships-service',
    interaction: {
      state: 'there is a spaceship with id 1 in the database',
      uponReceiving: 'a request to get all spaceships',
      withRequest: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        path: '/spaceships',
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
          itemsPerPage: Matchers.somethingLike(1),
          page: Matchers.somethingLike(1),
          totalItems: Matchers.somethingLike(1),
          items: Matchers.eachLike({
            id: Matchers.somethingLike(1),
            name: Matchers.somethingLike('A spaceship'),
            description: Matchers.somethingLike('Spaceship description'),
            size: Matchers.somethingLike('small'),
          }, {
            min: 1,
          }),
        }
      },
    },
  };

  return [
    getSpaceshipInteraction,
  ];
}