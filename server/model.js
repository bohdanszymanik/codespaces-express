// model.js
// In-memory OAuth model for demo purposes
import crypto from 'crypto';

const users = [{ id: 1, username: 'test', password: 'secret' }];
const tokens = {};
const clients = [{ id: 'client1', clientId: 'client1', clientSecret: 'clientSecret', grants: ['password', 'refresh_token'] }];

export default {
  getAccessToken: async (accessToken) => tokens[accessToken] || null,

  getClient: async (clientId, clientSecret) => {
    const client = clients.find(c => c.clientId === clientId && c.clientSecret === clientSecret);
    return client || null;
  },

  saveToken: async (token, client, user) => {
    const accessToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: { id: client.clientId },
      user: { id: user.id, username: user.username }
    };
    tokens[token.accessToken] = accessToken;
    tokens[token.refreshToken] = accessToken;
    return accessToken;
  },

  getUser: async (username, password) => {
    return users.find(u => u.username === username && u.password === password) || null;
  },

  getRefreshToken: async (refreshToken) => tokens[refreshToken] || null,

  revokeToken: async (token) => {
    delete tokens[token.refreshToken];
    return true;
  }
};
