import handleAction from '../handleAction';
import persister from '../../../persistence/inMemory/InMemoryPersister';
import { initPersistence } from '../../../lib/action/persistenceUtils';
import { upperCaseEachWordify } from '../utils';
import defaults from '../defaults';

beforeAll(() => {
  initPersistence(persister);
});

describe('test action handler', function () {
  it('should handle add action', function () {
    const actionObj = {
      actionStr: 'add 100',
      op: 'add',
      amount: 100,
      isValid: true,
    };

    const userObj = {
      userId: 'fred_jones',
      name: 'Fred Jones',
    };

    const action = handleAction(userObj, actionObj);
    const { userId, actionStr, amount, op } = action;
    expect(op).toBe('add');
    expect(amount).toBe(100);
    expect(actionStr).toBe(
      `add 100 [ makes ${upperCaseEachWordify(defaults.mainAccount)}: 100.00 ] `
    );
    expect(userId).toBe(userObj.userId);
  });
});
