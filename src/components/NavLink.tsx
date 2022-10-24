// import { useRouter } from "../store";

export const NavLink = (props: any) => {
  // const { getParams } = useRouter();
  return (
    <a
      class={props.class}
      // classList={{ active: props.active || getParams()?.routeName === props.route }}
      classList={{ active: props.active }}
      href={`#/${props.href || props.route}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {props.children}
    </a>
  );
};
