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
import NotReallyTexting from './screens/NotReallyTexting';
import Possibilities from './screens/Possibilities';
import SetOp from './screens/SetOp';
import SpendOp from './screens/SpendOp';
import SpendCategoryStuff from './screens/SpendCategoryStuff';
import SpendingCategories from './screens/SpendingCategories';
import UppercaseLetters from './screens/UppercaseLetters';

const helpScreenMap = {
  1: First,
  2: NotReallyTexting,
  3: Actions,
  4: SetOp,
  5: AccountNames,
  6: ManyAccountNames,
  7: AccountGroupNames,
  8: ManyAccountGroups,
  9: UppercaseLetters,
  10: AddOp,
  11: SpendOp,
  12: SpendCategoryStuff,
  13: SpendingCategories,
  14: GiveOp,
  15: MoveOp,
  16: AdjustOp,
  17: Possibilities,
};

export default helpScreenMap;
