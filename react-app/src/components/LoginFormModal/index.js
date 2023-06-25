import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";
import LoginToSignUpModal from "./LoginToSignUpModal";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demoUserLogin = () => {
    return dispatch(login('demo@aa.io', "password")).then(() => closeModal())
  }

  const demoUserLoginTwo = () => {
    return dispatch(login("demo_two@aa.io", "password")).then(() => closeModal())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };
  console.log("THE ERRORS IN THE LOG IN ", errors)

  // useEffect(() => {

  // }, [email])
  // useEffect(() => {

  // }, [password])

  return (
    <div className="login-modal">
      <h1>Log in to Spnotify</h1>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label className="login-label">
          <div>Email {errors.email && <span className="errors">{errors.email}</span>}</div>
          <input
            className="login-modal-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label className="login-label">
        <div>Password {errors.password && <span className="errors">{errors.password}</span>}</div>
          <input
            className="login-modal-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <div className="login-modal-buttons-bottom">
        <button className="login-form-demo-button" type="submit">Log In</button>
        <button className='login-form-demo-button' onClick={() => demoUserLogin()}>Login as Demo User One</button>
        <button className='login-form-demo-button' onClick={() => demoUserLoginTwo()}>Login as Demo User Two</button>
        </div>
      </form>
      <div className="link-to-signup">
          <div className="login-label">Don't have an account?</div>
          <LoginToSignUpModal modalComponent={<SignupFormModal />} />
      </div>
    </div>
  );
}

export default LoginFormModal;
