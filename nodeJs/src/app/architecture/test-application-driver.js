const PrimaryPort = require('./primary-port');
const Request = require('./request');

class TestApplicationDriver {
  constructor() {
    this.verticals = [];
    this.testAdapter = new PrimaryPort({
      start() {
        // Do nothing
      },
      register: vertical => {
        this.verticals[vertical.name] = vertical;
      }
    });
  }

  getAdapter() {
    return this.testAdapter;
  }

  sendRequest(verticalName, featureName, data) {
    const vertical = this.verticals[verticalName];
    const feature = vertical.features.filter(f => f.name === featureName)[0];
    return feature.handle(new Request(data));
  }
}

module.exports = TestApplicationDriver;
