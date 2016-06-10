// load up server and basic routes
const express = require('express');
const helpers = require('./server_helpers/middleware');
const requestHandler = require('./server_helpers/request-handler');
const bodyParser = require('body-parser');

const app = express();

const port = 4000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); // Fixes 404 errors for empty response body
app.use(helpers.logger);
app.use(express.static(__dirname.concat('/../public')));

app.get('/', requestHandler.main.get);

// TODO: If server acts as mainly an API, then directory /api/** - i.e. /api/create
app.get('/signin', requestHandler.signin.get);
app.post('/signin', requestHandler.signin.post);

// app.get('/create', requestHandler.create.get);
// app.post('/create', requestHandler.create.post);

// app.get('/dashboard', requestHandler.dashboard.get);

app.post('/api/categorize', requestHandler.categorize.post);

app.listen(port, () => {
  console.log('Listening on port:', port, '!');
});

module.exports = app;
