import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import AccountsContainer from './components/accounts/AccountsContainer';
import ActionsContainer from './components/actions/ActionsContainer';
import HelpOverlay from './components/help/HelpOverlay';
import MenuBar from './components/menuBar';
import TotalsContainer from './components/totals/TotalsContainer';
import './aatapp.css';

function App() {
  const [showHelp, setShowHelp] = useState(false);
  const showHelpRef = useRef(showHelp);
  useEffect(() => {
    showHelpRef.current = showHelp;
  });

  const onMenuItemClick = (item) => {
    if (!item) {
      return;
    }
    if (item === 'help') {
      setShowHelp(showHelpRef.current);
    }
  };

  return (
    <div className="aatapp-container">
      {showHelp && (
        <Sidebar
          onHide={() => setShowHelp(false)}
          position="top"
          style={{
            alignItems: 'center',
            backgroundColor: '#444cf755',
            height: 'calc(100vh - 10rem)',
            justifyContent: 'center',
            marginTop: '6rem',
            maxWidth: '327px',
            marginLeft: 'calc(50vw - 171px)',
            zIndex: 1000,
          }}
          visible={showHelp}
        >
          <HelpOverlay />
        </Sidebar>
      )}
      <Card className="aatapp-appcard p-shadow-5">
        <MenuBar onItemClick={onMenuItemClick} />
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
