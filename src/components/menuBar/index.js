import React from 'react';
import logo from '../../assets/icons/logo.png';
import './menubar.css';

const MenuBar = ({ onItemClick }) => {
  return (
    <div className="menubar-container">
      <img
        alt="Action Accounts Totals Logo"
        className="p-mr-2"
        height="20"
        src={logo}
        title="Action Accounts Totals"
      />
      <i
        title="Show Help"
        className="pi pi-question-circle menubar-icon"
        onClick={() => onItemClick('help')}
      />
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
