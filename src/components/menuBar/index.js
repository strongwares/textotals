import React, { useContext } from 'react';
import AuthContext from '../../auth/context';
import useAuth from '../../auth/useAuth';
import logo from '../../assets/icons/logo.png';
import './menubar.css';

const MenuBar = ({ onItemClick }) => {
  const { user } = useContext(AuthContext);
  const { onLogout } = useAuth();

  return (
    <div className="menubar-container">
      <img
        alt="Textotals Logo"
        className="p-mr-2"
        height="20"
        src={logo}
        title="Texotals: Action Accounts Totals"
      />
      <i
        title="Show Help"
        className="pi pi-question-circle menubar-icon"
        onClick={() => onItemClick('help')}
      />
      <div id="spacer" style={{ flex: 1 }} />
      {!!user && (
        <i
          title="Logout"
          className="pi pi-sign-out menubar-icon"
          onClick={onLogout}
        />
      )}
    </div>
  );
};

// The primereact menubar component is too helpful and sets a breakpoint
// on narrow screens and them creates a hamburger menu with a drop down
/*
class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        icon: 'pi pi-question-circle',
        command: () => props.onItemClick('help'),
      },
    ];
  }

  render() {
    const start = (
      <img
        alt="Action Accounts Totals Logo"
        className="p-mr-2"
        height="20"
        src={logo}
        title="Action Accounts Totals"
      />
    );

    return (
      <div className="menubar-container">
        <Menubar model={this.items} start={start} />
      </div>
    );
  }
}
*/

export default MenuBar;
