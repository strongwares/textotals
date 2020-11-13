import { initActionPersistence } from './action/persistenceUtils';
import { initUserPersistence } from './user/persistenceUtils';

function initPersistence(dataPersister, userPersister) {
  initActionPersistence(dataPersister);
  initUserPersistence(userPersister);
}

export { initPersistence };
