import { app_create, app_run } from "./core/app.js";
import { index_router } from "./routes/index.js";
import OAuthServer from 'express-oauth-server';
import model from './model.js';

const app = app_create();

// app.use('/', index_router);

// Initialize OAuth server
app.oauth = new OAuthServer({
  model,
  accessTokenLifetime: 60 * 60, // 1 hour
  refreshTokenLifetime: 60 * 60 * 24 * 30 // 30 days
});

// Token endpoint (password & refresh_token grants)
app.post('/oauth/token', app.oauth.token());

// Protected resource
app.get('/secure', app.oauth.authenticate(), (req, res) => {
    res.json({ message: 'Secure data', user: req.user });
});

// Public endpoint
app.get('/', (req, res) => {
    res.send('OAuth 2.0 Server is running');
});


app_run(app);