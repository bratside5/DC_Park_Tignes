import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="ml-2 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    >
      Log In
    </button>
  );
};

export default LoginButton;
