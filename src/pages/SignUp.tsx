import { useCommonStore } from "../store";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export function SignUp() {
  const [commonState]: any = useCommonStore();
  const navigate = useNavigate();

  const signUpHanlder = async function () {
    const res = await state.signUp(username(), email(), password());
    // to home
    navigate("/");
  };

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [email, setEmail] = createSignal("");

  return (
    <div style="">
      <input
        id="username"
        type="text"
        onchange={(e: any) => setUsername(e.target.value)}
      ></input>
      <input
        id="email"
        type="text"
        onchange={(e: any) => setEmail(e.target.value)}
      ></input>
      <input
        id="password"
        type="text"
        onchange={(e: any) => setPassword(e.target.value)}
      ></input>
      <button id="signUpBtn" onclick={signUpHanlder}>Sign up</button>
    </div>
  );
}
