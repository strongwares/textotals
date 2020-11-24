import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import AccountsContainer from './components/accounts/AccountsContainer';
import ActionsContainer from './components/actions/ActionsContainer';
import AuthContext from './auth/context';
import authStorage from './auth/storage';
import MenuBar from './components/menuBar';
import Overlay from './components/overlay/Overlay';
import TotalsContainer from './components/totals/TotalsContainer';
import WelcomeScreen from './components/welcome';
import './aatapp.css';

function App() {
  const [user, setUser] = useState();
  const [showSidebar, setShowSidebar] = useState(undefined);
  const showSidebarRef = useRef(showSidebar);
  const [tabNumber, setTabNumber] = useState(0);
  const tabNumberRef = useRef(tabNumber);

  useEffect(() => {
    showSidebarRef.current = showSidebar;
    tabNumberRef.current = tabNumber;

    if (!user) {
      const savedUser = authStorage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }

    // authStorage.removeToken();
  }, [showSidebar, tabNumber, user]);

  const onMenuItemClick = (item) => {
    if (!item) {
      return;
    }
    if (!!showSidebarRef.current && showSidebarRef.current === item) {
      setShowSidebar(undefined);
    } else {
      setShowSidebar(item);
    }
  };

  const onTabChange = ({ index }) => {
    setTabNumber(index);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="aatapp-container">
        {!!showSidebar && (
          <Sidebar
            onHide={() => setShowSidebar(undefined)}
            position="top"
            style={{
              borderRadius: '5%',
              border: '2px solid blue',
              backgrounddColor: '#e5e5f7',
              height: 'var(--sidebarHeight)',
              marginTop: '0.5rem',
              maxWidth: 'var(--responsive-overlaywidth)',
              zIndex: 1000,

              aalignItems: 'center',
              justifyContent: 'center',

              marginLeft: 'var(--responsive-overlayMarginLeft)',
            }}
            visible={!!showSidebar}
          >
            <Overlay what={showSidebar} />
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
                    onHelp={() => setShowSidebar('help')}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Accounts"
                  leftIcon="pi pi-folder-open"
                >
                  <AccountsContainer
                    user={user}
                    onHelp={() => setShowSidebar('help')}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Totals"
                  leftIcon="pi pi-tags"
                >
                  <TotalsContainer
                    user={user}
                    onHelp={() => setShowSidebar('help')}
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
