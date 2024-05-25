# API-Server-Project

This is backend project that stores card data in a json file in the data folder. It also stores user data in that folder. It was created with Node.js and 4 modules: Express.js, Express-JWT, JsonWebToken and dotenv. In order to run the code on your machine, follow the steps bellow:
- pull the code to your machine.
- run *npm install*
- then create a .env file that contains your secret.
- then run the app.js file with node.

You can use the api.http file to send requests to the server, but you will need the rest client extension to run it.

This server has 5 routes:

## POST request to /getToken
- Accepts a username and password.
- Validates the credentials against a user JSON file.
- Returns a JSON Web Token (JWT) upon successful authentication.
- Returns a 401 status code with an error message if authentication fails.

## GET Request to /cards
- Retrieve all cards with optional query parameters for filtering (8 points).
- Example: http://localhost:3000/cards?set=Base%20Set&type=Creature&rarity=Common

## POST request to /cards/create
- Creates a new card using information from the request body.
- Requires a valid JWT.

## PUT request to /cards/:id
- Updates a card using information from the request body and the id in the request params.
- Requires a valid JWT.

## DELETE request to /cards/:id
- Deletes a card using the id in the request params.
- Requires a valid JWT.