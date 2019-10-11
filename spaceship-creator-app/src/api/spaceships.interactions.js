module.exports = (Matchers) => {

  // This interaction describes the api request to fetch data about spaceships
  const getSpaceshipInteraction = {
    consumer: 'spaceship-creator-app',
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
        body: Matchers.eachLike({
          id: Matchers.somethingLike(1),
        }, {
          min: 1,
        }),
      },
    },
  };

  const postSpaceshipInteraction = {
    consumer: 'spaceship-creator-app',
    provider: 'spaceships-service',
    interaction: {
      uponReceiving: 'a request to add a new spaceship',
      withRequest: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        path: '/spaceships',
        body: {
          name: Matchers.somethingLike('A Spaceship'),
          description: Matchers.somethingLike('to infinity and beyond'),
          size: Matchers.term({
            matcher: 'small|medium|large',
            generate: 'small',
          }),
        },
      },
      willRespondWith: {
        status: 201,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
          id: Matchers.somethingLike(1),
          name: Matchers.somethingLike('A Spaceship'),
          description: Matchers.somethingLike('A Spaceship'),
          size: Matchers.term({
            matcher: 'small|medium|large',
            generate: 'small',
          }),
        },
      },
    },
  };

  return [
    getSpaceshipInteraction,
    postSpaceshipInteraction,
  ];
}