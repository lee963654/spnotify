import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";

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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label>
          Email
          {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          {errors.password && <p>{errors.password}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className='login-form-demo-button' onClick={() => demoUserLogin()}>Login as Demo User One</button>
          <button className='login-form-demo-button' onClick={() => demoUserLoginTwo()}>Login as Demo User Two</button>
      </form>
    </>
  );
}

export default LoginFormModal;
