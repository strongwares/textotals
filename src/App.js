import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import AccountsContainer from './components/accounts/AccountsContainer';
import ActionsContainer from './components/actions/ActionsContainer';
import AuthContext from './auth/context';
import authStorage from './auth/storage';
import HelpOverlay from './components/help/HelpOverlay';
import MenuBar from './components/menuBar';
import TotalsContainer from './components/totals/TotalsContainer';
import WelcomeScreen from './components/welcome';
import './aatapp.css';

function App() {
  const [user, setUser] = useState();
  const [showHelp, setShowHelp] = useState(false);
  const showHelpRef = useRef(showHelp);
  const [tabNumber, setTabNumber] = useState(0);
  const tabNumberRef = useRef(tabNumber);

  useEffect(() => {
    showHelpRef.current = showHelp;
    tabNumberRef.current = tabNumber;

    if (!user) {
      const savedUser = authStorage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }

    // authStorage.removeToken();
  }, [showHelp, tabNumber, user]);

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
              height: 'calc(100vh - 9.5rem)',
              justifyContent: 'center',
              marginTop: '5.5rem',
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

          {!user && <WelcomeScreen />}

          {!!user && (
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
                  <ActionsContainer
                    user={user}
                    onHelp={() => setShowHelp(true)}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Accounts"
                  leftIcon="pi pi-folder-open"
                >
                  <AccountsContainer
                    user={user}
                    onHelp={() => setShowHelp(true)}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Totals"
                  leftIcon="pi pi-tags"
                >
                  <TotalsContainer
                    user={user}
                    onHelp={() => setShowHelp(true)}
                  />
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
