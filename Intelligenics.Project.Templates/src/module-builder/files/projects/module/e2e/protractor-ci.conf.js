const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    binary: process.env.CHROME_BIN,
    args: ['--headless', '--no-sandbox', '--disable-gpu'],
  }
};
exports.config = config;