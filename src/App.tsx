import type { Component } from "solid-js";
import { NavBar } from "./components/NavBar";
import { Routes, Route } from "@solidjs/router";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { SignUp } from "./pages/SignUp";

const App: Component = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/users" component={Users} />
        <Route path="/" component={Home} />
        <Route path="/register" component={SignUp} />
      </Routes>
    </div>
  );
};

export default App;
