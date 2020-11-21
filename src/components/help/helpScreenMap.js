import AccountGroupNames from './screens/AccountGroupNames';
import AccountNames from './screens/AccountNames';
import Actions from './screens/Actions';
import AddOp from './screens/AddOp';
import AdjustOp from './screens/AdjustOp';
import Examples from './screens/Examples';
import First from './screens/First';
import GiveOp from './screens/GiveOp';
import ManyAccountNames from './screens/ManyAccountNames';
import ManyAccountGroups from './screens/ManyAccountGroups';
import MoveOp from './screens/MoveOp';
import TheBrain from './screens/TheBrain';
import Possibilities from './screens/Possibilities';
import Second from './screens/Second';
import SetOp from './screens/SetOp';
import SpendOp from './screens/SpendOp';
import SpendCategoryStuff from './screens/SpendCategoryStuff';
import SpendingCategories from './screens/SpendingCategories';
import Third from './screens/Third';
import UppercaseLetters from './screens/UppercaseLetters';

const helpScreenMap = {
  1: Examples,
  2: Possibilities,
  3: <First />,
  4: <Second />,
  5: <Third />,
  6: Actions,
  7: SetOp,
  8: SpendOp,
  9: TheBrain,
  10: AccountNames,
  11: ManyAccountNames,
  12: AccountGroupNames,
  13: ManyAccountGroups,
  14: UppercaseLetters,
  15: SpendCategoryStuff,
  16: SpendingCategories,
  17: AddOp,
  18: GiveOp,
  19: MoveOp,
  20: AdjustOp,
};

export default helpScreenMap;
