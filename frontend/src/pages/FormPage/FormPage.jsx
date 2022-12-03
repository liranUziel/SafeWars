import { ReactComponent as SafeBox } from "../../assets/Images/safebox.svg";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  theme,
} from "@chakra-ui/react";

//State
import { useState } from "react";

import SigninCompent from "./components/SigninCompent";
import SingupCompent from "./components/SignupCompent";

import ColorModeToggle from "../../components/ColorModeToggle";

const signInSignUp = "text-white w-20 h-7 border-none font-semibold";

function LogingAndSignup() {
  //Hold the signup-signin toggle state
  const [isHidden, setisHidden] = useState(true);

  const signinToggleBtn = document.getElementById("signin-toggle");
  const signupToggleBtn = document.getElementById("signup-toggle");

  const signinToggle = (e) => {
    //Can be better with if statment
    if (isHidden) {
      signinToggleBtn.classList.remove("toggled");
      signupToggleBtn.classList.add("toggled");
    } else {
      signupToggleBtn.classList.remove("toggled");
      signinToggleBtn.classList.add("toggled");
    }
    setisHidden(!isHidden);
  };
  return (
    <div className="h-screen dark:bg-dark-accenet-900 bg-light-accent-900">
      <main className="grid grid-cols-2 h-full">
        <div className="absolute right-0 h-screen w-1/2 shadow-2xl shadow-dark-color">
          <Tabs variant="soft-rounded" align="end" defaultIndex={1}>
            <TabList mb="1em" className="m-3">
              <Tab
                className={signInSignUp}
                _selected={{ bg: "bg-dark-accenet.100" }}
              >
                SignUp
              </Tab>
              <Tab className={signInSignUp} _selected={{}}>
                SignIn
              </Tab>
              <ColorModeToggle />
            </TabList>
            <TabPanels>
              <TabPanel>
                <SingupCompent />
              </TabPanel>
              <TabPanel>
                <SigninCompent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <div className="dark:bg-dark-accenet-100 bg-light-accent-100 h-full flex items-center justify-center">
          <SafeBox className="h-[36rem] dark:fill-dark-accenet-800 fill-light-accent-800 w-30 " />
        </div>
      </main>
    </div>
  );
}

export default LogingAndSignup;
