import type { Component } from "solid-js";
import { NavBar } from "./components/NavBar";
import { Router } from "@solidjs/router";
import { Routes, Route } from "@solidjs/router";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";

const App: Component = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/users" component={Users} />
        <Route path="/" component={Home} />
      </Routes>
    </div>
  );
};

export default App;
