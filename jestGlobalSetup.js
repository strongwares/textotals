import LocalStorageStub from './__mocks__/LocalStorageStub';

module.exports = async () => {
  global.localStorage = new LocalStorageStub();
};
