import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import SignupToLoginModal from "./SignupToLoginModal";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			console.log("THE DATA IN THE SUBMIT", data)
			if (data) {
				console.log("THE DATA AFTER IN THE SUBMIT", data)
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors({
				password: "Confirm Password field must be the same as the Password field",
			});
		}
	};



	return (
		<div className="signup-modal-container">
			<h1>Sign up for free to start listening</h1>
			<form className="signup-form-modal" onSubmit={handleSubmit}>

				<label className="signup-label">
					<div className="signup-input-label">Email {errors.email && <span className="errors">{errors.email}</span>}</div>
					<input
						className="signup-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>
				</label>
				<label className="signup-label">
					<div className="signup-input-label">Username {errors.username && <span className="errors">{errors.username}</span>}</div>
					<input
						className="signup-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter a profile name"
						required
					/>
				</label>
				<label className="signup-label">
					<div className="signup-input-label">Password {errors.password && <span className="errors">{errors.password}</span>}</div>
					<input
						className="signup-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Create a password"
						required
					/>
				</label>
				<label className="signup-label">
					<div className="signup-input-label">Confirm Password</div>
					<input
						className="signup-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm password"
						required
					/>
				</label>
				<button className="signup-modal-button" type="submit">Sign Up</button>
			</form>
			<div className="link-to-signup">
				<div className="signup-label">Have an account?</div>
				<SignupToLoginModal modalComponent={<LoginFormModal />}/>
			</div>
		</div>
	);
}

export default SignupFormModal;
