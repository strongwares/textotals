class ActionParser {
  newAction(action) {
    console.log(`newAction: ${action}`);
  }
}

const actionParser = new ActionParser();
Object.freeze(actionParser);
export default actionParser;
