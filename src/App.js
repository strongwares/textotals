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
import { useMediaQuery } from 'react-responsive';
import './aatapp.css';

/*
let setIsMobileLandscapeFunc;
function onMediaQueryChange(matches) {
  console.log(`onMediaQueryChange: matches: ${matches}`);
  if (setIsMobileLandscapeFunc) {
    setIsMobileLandscapeFunc(matches);
  }
}
*/

function App() {
  const [user, setUser] = useState();
  const [sidebarItem, setShowSidebar] = useState(undefined);
  const sidebarItemRef = useRef(sidebarItem);
  const [tabNumber, setTabNumber] = useState(0);
  const tabNumberRef = useRef(tabNumber);
  const isMobileLandscape = useMediaQuery({
    maxWidth: 767,
    orientation: 'landscape',
  });
  // undefined,
  // onMediaQueryChange
  /*
  const [isMobileLandscape, setIsMobileLandscape] = useState(
    initialIsMobileLandscape
  );
  console.log(
    `initial: ${initialIsMobileLandscape},  isMobileLandscape: ${isMobileLandscape}`
  );
  */
  // console.log(`isMobileLandscape: ${isMobileLandscape}`);

  useEffect(() => {
    sidebarItemRef.current = sidebarItem;
    tabNumberRef.current = tabNumber;

    if (!user) {
      const savedUser = authStorage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }

    // authStorage.removeToken();
  }, [sidebarItem, tabNumber, user]);

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

  const onTabChange = ({ index }) => {
    setTabNumber(index);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="aatapp-container">
        {!!sidebarItem && (
          <Sidebar
            onHide={() => setShowSidebar(undefined)}
            position="top"
            style={{
              borderRadius: '5%',
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

          {!user && <WelcomeScreen isMobileLandscape={isMobileLandscape} />}

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
                    isMobileLandscape={isMobileLandscape}
                    onHelp={() => setShowSidebar('help')}
                    user={user}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Accounts"
                  leftIcon="pi pi-folder-open"
                >
                  <AccountsContainer
                    isMobileLandscape={isMobileLandscape}
                    onHelp={() => setShowSidebar('help')}
                    user={user}
                  />
                </TabPanel>

                <TabPanel
                  contentClassName="aatapp-tabpanel-content"
                  header="&nbsp;&nbsp;Totals"
                  leftIcon="pi pi-tags"
                >
                  <TotalsContainer
                    isMobileLandscape={isMobileLandscape}
                    onHelp={() => setShowSidebar('help')}
                    user={user}
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
