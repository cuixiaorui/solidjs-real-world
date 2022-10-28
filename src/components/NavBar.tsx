import { NavLink } from "./NavLink";
import { Show } from "solid-js";
import { useCommonStore } from "../store";
// import { useCount } from "../store";

export const NavBar = () => {
  const [commonState]: any = useCommonStore();

  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <NavLink class="navbar-brand" route="">
          {commonState.appName}
        </NavLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <NavLink class="nav-link" route="">
              Home
            </NavLink>
          </li>
          <Show
            when={commonState.currentUser.username}
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
                href={`@${commonState.currentUser.username}`}
              >
                {commonState.currentUser.username}
              </NavLink>
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
};
