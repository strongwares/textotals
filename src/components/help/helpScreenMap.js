import AccountGroupNames from './screens/AccountGroupNames';
import AccountNames from './screens/AccountNames';
import Actions from './screens/Actions';
import AddOp from './screens/AddOp';
import AdjustOp from './screens/AdjustOp';
import First from './screens/First';
import GiveOp from './screens/GiveOp';
import ManyAccountNames from './screens/ManyAccountNames';
import ManyAccountGroups from './screens/ManyAccountGroups';
import MoveOp from './screens/MoveOp';
import TheBrain from './screens/TheBrain';
import Possibilities from './screens/Possibilities';
import SetOp from './screens/SetOp';
import SpendOp from './screens/SpendOp';
import SpendCategoryStuff from './screens/SpendCategoryStuff';
import SpendingCategories from './screens/SpendingCategories';
import UppercaseLetters from './screens/UppercaseLetters';

const helpScreenMap = {
  1: First,
  2: Actions,
  3: SetOp,
  4: SpendOp,
  5: TheBrain,
  6: AccountNames,
  7: ManyAccountNames,
  8: AccountGroupNames,
  9: ManyAccountGroups,
  10: UppercaseLetters,
  11: SpendCategoryStuff,
  12: SpendingCategories,
  13: AddOp,
  14: GiveOp,
  15: MoveOp,
  16: AdjustOp,
  17: Possibilities,
};

export default helpScreenMap;
