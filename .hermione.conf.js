module.exports = {
  baseUrl: "http://localhost:3000/hw/store",

  windowSize: '1920x1080',

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      retry: 2,
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
