// src/auth-service/utils/tokenBlacklist.js
const blacklistedTokens = new Set();

const blacklistToken = (token) => {
  blacklistedTokens.add(token);
};

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
