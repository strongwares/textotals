import { initActionPersistence } from './action/persistenceUtils';
import { initUserPersistence } from './user/persistenceUtils';

let persister;

function initPersistence(myPersister) {
  /* eslint-disable-next-line no-unused-vars */
  persister = myPersister;
  initActionPersistence(myPersister);
  initUserPersistence(myPersister);
}

export { initPersistence };
