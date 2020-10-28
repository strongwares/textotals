import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/icons/logo.png';
import './menubar.css';

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
  // icon: 'pi pi-fw pi-question-circle',

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

export default MenuBar;
