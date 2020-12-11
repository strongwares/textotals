import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import AppLoading from './AppLoading';
import AuthContext from './auth/context';
import authStorage from './auth/storage';
import MenuBar from './components/menuBar';
import Overlay from './components/overlay/Overlay';
import WelcomeScreen from './components/welcome';
import { useMediaQuery } from 'react-responsive';
import './aatapp.css';

const AccountsComponent = React.lazy(() =>
  import('./components/accounts/AccountsContainer')
);
const ActionsComponent = React.lazy(() =>
  import('./components/actions/ActionsContainer')
);
const TotalsComponent = React.lazy(() =>
  import('./components/totals/TotalsContainer')
);

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [sidebarItem, setShowSidebar] = useState(undefined);
  const sidebarItemRef = useRef(sidebarItem);
  const [tabNumber, setTabNumber] = useState(0);
  const tabNumberRef = useRef(tabNumber);
  const isMobileLandscape = useMediaQuery({
    maxWidth: 767,
    orientation: 'landscape',
  });

  useEffect(() => {
    sidebarItemRef.current = sidebarItem;
    tabNumberRef.current = tabNumber;
    // uncomment the following to clear out the
    // local storage persisted user:
    // authStorage.removeToken();
  }, [sidebarItem, tabNumber]);

  // Function used by the AppLoading screen, when it
  // acquires a persisted user from local storage
  // then the main tabs are shown.
  const restoreUser = () => {
    const savedUser = authStorage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  };

  const onMenuItemClick = (item) => {
    if (!item) {
      return;
    }
    if (!!sidebarItemRef.current && sidebarItemRef.current === item) {
      setShowSidebar(undefined);
    } else {
      setShowSidebar(item);
    }
  };

  // Tab component is a controlled component, the
  // current tab being displayed is part of local state
  // just in case we want to do context sensitive help:
  const onTabChange = ({ index }) => {
    setTabNumber(index);
  };

  // Show welcom when no persited user and the ready
  // state says we've already loaded a persisted user
  // from local storage:
  const showWelcome = !user && isReady;

  // Show tabs when we've got a logged in user loaded
  // from local storage;
  const showTabs = !!user && isReady;

  // The sideabar is a complete covering overlay
  // of the main app.
  // The main menubar is always rendered even when no
  // user is logged in, the help button is always
  // available.
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="aatapp-container">
        {!!sidebarItem && (
          <Sidebar
            onHide={() => setShowSidebar(undefined)}
            position="top"
            style={{
              borderRadius: '3%',
              border: '2px solid blue',
              backgrounddColor: '#e5e5f7',
              height: 'var(--sidebarHeight)',
              marginTop: '0.5rem',
              maxWidth: 'var(--responsive-overlayWidth)',
              zIndex: 1000,
              justifyContent: 'center',
              marginLeft: 'var(--responsive-overlayMarginLeft)',
            }}
            visible={!!sidebarItem}
          >
            <Overlay isMobileLandscape={isMobileLandscape} what={sidebarItem} />
          </Sidebar>
        )}

        <Card className="aatapp-appcard p-shadow-5">
          <MenuBar onItemClick={onMenuItemClick} />

          {!isReady && (
            <AppLoading startFunc={restoreUser} onFinish={setIsReady} />
          )}

          {showWelcome && (
            <WelcomeScreen isMobileLandscape={isMobileLandscape} />
          )}

          {showTabs && (
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
                  <Suspense fallback={<div>Loading...</div>}>
                    <ActionsComponent
                      isMobileLandscape={isMobileLandscape}
                      onHelp={() => setShowSidebar('help')}
                      user={user}
                    />
                  </Suspense>
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Accounts"
                  leftIcon="pi pi-folder-open"
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <AccountsComponent
                      isMobileLandscape={isMobileLandscape}
                      onHelp={() => setShowSidebar('help')}
                      user={user}
                    />
                  </Suspense>
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Totals"
                  leftIcon="pi pi-tags"
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <TotalsComponent
                      isMobileLandscape={isMobileLandscape}
                      onHelp={() => setShowSidebar('help')}
                      user={user}
                    />
                  </Suspense>
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
