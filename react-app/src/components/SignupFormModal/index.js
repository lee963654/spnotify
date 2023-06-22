import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

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
	console.log("THE ERRORS OUTSIDE", errors)


	return (
		<>
			<h1>Sign Up</h1>
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
					Username
					{errors.username && <p>{errors.username}</p>}
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
