const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://aqueous-brook-60480.herokuapp.com/',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
