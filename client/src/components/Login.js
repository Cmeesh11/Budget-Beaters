import React from "react";
import Auth from "../utils/auth";

let login;
if (Auth.loggedIn()) {
  login = true;
} else {
  login = false;
}
function Login() {
  return (
    <>
      {!login ? (
        <button className="btn btn-success"><a href="/login">Login/Signup</a></button>
      ) : (
        <button className="btn btn-success"><a href="/logout">Logout</a></button>
      )}
    </>
  );
}

export default Login;
