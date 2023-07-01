module.exports = {
  baseUrl: "http://localhost:3000/hw/store",
  sets: {
    desktop: {
      files: "test/hermione",
      browsers: ['chrome']
    },
  },
  
  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      retry: 3,
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
