## Additional Config

### Token
The token was created using the [nJwt library][https://www.npmjs.com/package/njwt]. It requires a base64 string key to sign the tokens obtained from the .env file, with the name of APP_KEY.

The token expires after one hour by default.


### Dotenv values example

```APP_URL=http://127.0.0.1
APP_URL=http://127.0.0.1
APP_KEY=PlZ7Lq3dp5YLOiHVf0QD6Q==

DB_URI=mongodb://127.0.0.1:27017
DB_DATABASE=test
PORT=3000
```

### Conventional Commits
I created my commits following [this convention][https://www.conventionalcommits.org/en/v1.0.0-beta.2/].

<hr>

P.D: Thanks for the opportunity!
