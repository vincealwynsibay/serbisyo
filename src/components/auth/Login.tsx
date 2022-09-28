import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useLogin from "../../hooks/auth/useLogin";
import GoogleAuth from "./GoogleAuth";

interface Props {}

function Login({}: Props) {
	const [formData, setFormData] = useState({
		displayName: "",
		email: "",
		password: "",
	});

	const { isLoading, error, login } = useLogin();

	const navigate = useNavigate();

	// get the current user if there is
	const { user } = useAuthContext();

	// if already logged in
	if (user) {
		return <Navigate to='/' />;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevValue) => ({
			...prevValue,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		// login user and if successful redirect to home page
		await login(formData);

		console.log(error);

		if (!isLoading && !error) {
			navigate("/");
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				{/*  if there is error display message  */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{isLoading ? (
					<button type='submit' disabled>
						loading...
					</button>
				) : (
					<button type='submit'>Login</button>
				)}
			</form>
			<p>
				Don't have an account yet? <Link to='/register'>Register</Link>
			</p>

			<p>OR</p>

			<GoogleAuth />
		</div>
	);
}

export default Login;
