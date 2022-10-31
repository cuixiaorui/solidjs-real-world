/* @refresh reload */
import { render } from "solid-js/web";
import { Router, hashIntegration } from "@solidjs/router";
import "./index.css";
import App from "./App";
import { HopeProvider } from "@hope-ui/solid";
// import { StoreProvider } from "./store";
render(
  () => (
    // <StoreProvider>
    <Router source={hashIntegration()}>
      <HopeProvider>
        <App />
      </HopeProvider>
    </Router>
    // </StoreProvider>
  ),
  document.getElementById("root") as HTMLElement
);


function Comp() {
  
  return <div>1234</div>
  
}