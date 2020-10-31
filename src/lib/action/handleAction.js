import handleAccountActions, {
  genAccountActionsInput,
} from './handleAccountActions';
import { handleLinkAction, handleUnlinkAction } from './handleLinkActions';

function handleAction(userObj, actionObj) {
  const { userId, name } = userObj;
  // to enable testing
  let rval;
  if (actionObj.op === 'link') {
    rval = handleLinkAction(actionObj, userId, name);
  } else if (actionObj.op === 'unlink') {
    rval = handleUnlinkAction(actionObj, userId, name);
  } else {
    // This can be called recursively when a linked account is updated
    // orig:
    // _doActionInsert = function (actionObj, actionUserId, userName, curLinkSrc, origLinkSrc, postHandlingPrefix) {
    /*
    actionObj is the result of parseAction:
    {
      actionStr,
      op,
      accountGroup,
      amount
      category,
      fromAccount,
      toAccount,
      linkId, // for op link
      fromAccount, // for op link
      toAccount, // for op link

    }
    */
    rval = handleAccountActions(
      genAccountActionsInput(actionObj, userId, name, name, name)
    );
  }
  return rval;
}

export default handleAction;
