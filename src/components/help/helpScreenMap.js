import AccountGroupNames from './screens/AccountGroupNames';
import AccountNames from './screens/AccountNames';
import Actions from './screens/Actions';
import AddOp from './screens/AddOp';
import AdjustOp from './screens/AdjustOp';
import ClearOp from './screens/ClearOp';
import Examples from './screens/Examples';
import First from './screens/First';
import GiveOp from './screens/GiveOp';
import ManyAccountNames from './screens/ManyAccountNames';
import ManyAccountGroups from './screens/ManyAccountGroups';
import MoveOp from './screens/MoveOp';
import NotVeryWellConnected from './screens/NotVeryWellConnected';
import Possibilities from './screens/Possibilities';
import Second from './screens/Second';
import SetOp from './screens/SetOp';
import SpendOp from './screens/SpendOp';
import SpendCategoryStuff from './screens/SpendCategoryStuff';
import SpendingCategories from './screens/SpendingCategories';
import Storage from './screens/Storage';
import TheBrain from './screens/TheBrain';
import Third from './screens/Third';
import UppercaseLetters from './screens/UppercaseLetters';

const helpScreenMap = {
  1: <First />,
  2: <Second />,
  3: <Third />,
  4: Actions,
  5: SetOp,
  6: SpendOp,
  7: TheBrain,
  8: AccountNames,
  9: ManyAccountNames,
  10: AccountGroupNames,
  11: ManyAccountGroups,
  12: UppercaseLetters,
  13: SpendCategoryStuff,
  14: SpendingCategories,
  15: AddOp,
  16: GiveOp,
  17: MoveOp,
  18: AdjustOp,
  19: ClearOp,
  20: Storage,
  21: NotVeryWellConnected,
  22: Examples,
  23: Possibilities,
};

export default helpScreenMap;
