# Demo setup and pact workflow

## Initial setup
First modify your /etc/hosts file and add following entries: 

```
127.0.0.1	pacts.spaceships.site
127.0.0.1	www.spaceships.site
127.0.0.1	admin.spaceships.site
127.0.0.1	service.spaceships.site
```

Then startup docker containers in your terminal with `docker-compose build && docker-compose up`. When all containers are built and run, you can navigate to `www.spaceships.site` and `admin.spaceships.site` and check that the applications are working correctly.

Afterwards cd into the three node applications and in each one run `npm install`

## Test interactions

There are sample interactions for `spaceship-creator-app` in `spaceship-creator-app/src/api/spaceships.interactions.js` that are used in `spaceship-creator-app/src/api/api.spec.js`. Via these interactions and unit tests you can create the first pact by running `npm run test` in the `spaceship-creator-app`. This will generate a pact in `spaceship-creator-app/pacts/output` that you can publish to the pact broker via `npm run pacts:publish`. [You can find the pact broker here.](http://pacts.spaceships.site)

A similar workflow can be used to create pacts for `spaceships-viewer`. Interactions and unit tests can be found in `spaceships-viewer/routes/common`, when you run `npm run test && npm run pacts:publish` in `/spaceships-viewer` your pacts are generated and put to the broker. 

## Verification

To verify the pacts in the pact broker, the `spaceships-service` uses the script `spaceships-service/pacts/provider.spec.js`. With `npm run pacts:verification` in `/spaceships-service` the service will download the pacts from the broker and verify them by testing each interaction (calling the defined endpoint) in the service itself. Results will also be published back to the pact broker. 

## Breaking the Verification

If you want to test what happens, when you break one of the pacts, let's say we replace the current getSpaceships endpoint with one that also returns pagination data. You can replace the `getSpaceshipsInteraction` in `spaceships-viewer/routes/common/spaceships.interactions.js` with following code:
```
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
```

Now also update the test for this interaction in `spaceships-viewer/routes/common/handlers.spec.js` by switching 
```
expect(req.getSpaceshipsResult[0].id).toEqual(1);
```

with

```
expect(req.getSpaceshipsResult.page).toEqual(1);
```
This will make sure that instead of testing for an array in the get spaceships endpoint, it tests for the added pagination metadata.

Now rerun the tests for `spaceships-viewer` and publish your pacts. 

The last update is in `spaceships-service`. In `spaceships-service/routes/spaceships/handlers.js` replace 
```
function getSpaceships(req, res) {
  return res.json(spaceships.getItems());
}
```

with 

```
function getSpaceships(req, res) {
  return res.json(spaceships.getPaginatedItems());
}
```

If you now retry to verify your pacts on the broker, verification should work for the viewer app but not for the creator-app anymore. 

## Reset

If you want to reset the changes done in the last steps, in `spaceships-service` simply run `npm run reset`. This will reset the database, clear the pact broker from all interactions and reset the files to their initial implementations
