import React from 'react';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';
import AccountsContainer from './components/accounts/AccountsContainer';
import ActionsContainer from './components/actions/ActionsContainer';
import TotalsContainer from './components/totals/TotalsContainer';
import './aatapp.css';

// <ActionsTab />
function App() {
  return (
    <div className="aatapp-container">
      <Card className="aatapp-appcard p-shadow-5">
        <TabView className="aatapp-tabview">
          <TabPanel
            contentClassName="aatapp-tabpanel-content"
            header="&nbsp;&nbsp;Action"
            leftIcon="pi pi-comments"
          >
            <ActionsContainer />
          </TabPanel>

          <TabPanel
            contentClassName="aatapp-tabpanel-content"
            header="&nbsp;&nbsp;Accounts"
            leftIcon="pi pi-folder-open"
          >
            <AccountsContainer />
          </TabPanel>

          <TabPanel
            contentClassName="aatapp-tabpanel-content"
            header="&nbsp;&nbsp;Totals"
            leftIcon="pi pi-chart-line"
          >
            <TotalsContainer />
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
}

export default App;
