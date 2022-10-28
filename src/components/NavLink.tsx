export const NavLink = (props: any) => {
  function handleClick() {
    window.scrollTo(0, 0);
  }

  return (
    <a
      class={props.class}
      // classList={{ active: props.active || getParams()?.routeName === props.route }}
      classList={{ active: props.active }}
      href={`#/${props.href || props.route}`}
      onClick={handleClick}
    >
      {props.children}
    </a>
  );
};
