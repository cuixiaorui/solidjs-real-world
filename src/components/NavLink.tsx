// import { useRouter } from "../store";
import { useNavigate } from "@solidjs/router";

export const NavLink = (props: any) => {
  // const { getParams } = useRouter();
  const navigate = useNavigate();

  function handleClick() {
    window.scrollTo(0, 0);
    navigate("/register");
  }

  return (
    <a
      class={props.class}
      // classList={{ active: props.active || getParams()?.routeName === props.route }}
      classList={{ active: props.active }}
      onClick={handleClick}
    >
      {props.children}
    </a>
  );
};
