import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import AccountsContainer from './components/accounts/AccountsContainer';
import ActionsContainer from './components/actions/ActionsContainer';
import AuthContext from './auth/context';
import LoginForm from './components/login';
import HelpOverlay from './components/help/HelpOverlay';
import MenuBar from './components/menuBar';
import TotalsContainer from './components/totals/TotalsContainer';
import './aatapp.css';

let fakeUser = 1;
fakeUser = undefined;

function App() {
  const [user, setUser] = useState(fakeUser);
  const [showHelp, setShowHelp] = useState(false);
  const showHelpRef = useRef(showHelp);
  const [tabNumber, setTabNumber] = useState(0);
  const tabNumberRef = useRef(tabNumber);

  useEffect(() => {
    showHelpRef.current = showHelp;
    tabNumberRef.current = tabNumber;
  });

  const onMenuItemClick = (item) => {
    if (!item) {
      return;
    }
    if (item === 'help') {
      setShowHelp(!showHelpRef.current);
    }
  };

  const onTabChange = ({ index }) => {
    setTabNumber(index);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="aatapp-container">
        {showHelp && (
          <Sidebar
            onHide={() => setShowHelp(false)}
            position="top"
            style={{
              alignItems: 'center',
              backgroundColor: '#444cf755',
              height: 'calc(100vh - 11rem)',
              justifyContent: 'center',
              marginTop: '6rem',
              maxWidth: '327px',
              marginLeft: 'calc(50vw - 164px)',
              zIndex: 1000,
            }}
            visible={showHelp}
          >
            <HelpOverlay tabNumber={tabNumberRef.current} />
          </Sidebar>
        )}
        <Card className="aatapp-appcard p-shadow-5">
          <MenuBar onItemClick={onMenuItemClick} />
          {!user && <LoginForm />}
          {user && (
            <>
              <TabView
                activeIndex={tabNumber}
                onTabChange={onTabChange}
                className="aatapp-tabview"
              >
                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Action"
                  leftIcon="pi pi-comments"
                >
                  <ActionsContainer onHelp={() => setShowHelp(true)} />
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
            </>
          )}
        </Card>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
