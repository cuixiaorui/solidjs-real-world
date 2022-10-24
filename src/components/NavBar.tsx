import { NavLink } from "./NavLink";
import { Show } from "solid-js";
import { useStore } from "../store";
// import { useCount } from "../store";

export const NavBar = () => {
  const [state]: any = useStore();
  console.log(state.currentUser)

  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <NavLink class="navbar-brand" route="">
          {state.appName}
        </NavLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <NavLink class="nav-link" route="">
              Home
            </NavLink>
          </li>
          <Show
            when={state.currentUser.username}
            fallback={
              <>
                <li class="nav-item">
                  <NavLink class="nav-link" route="login">
                    Sign in
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" route="register">
                    Sign up
                  </NavLink>
                </li>
              </>
            }
          >
            <li class="nav-item">
              <NavLink class="nav-link" route="editor">
                <i class="ion-compose" /> New Post
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" route="settings">
                <i class="ion-gear-a" /> Settings
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                class="nav-link"
                route="profile"
                href={`@${state.currentUser.username}`}
              >
                {state.currentUser.username}
              </NavLink>
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
};
