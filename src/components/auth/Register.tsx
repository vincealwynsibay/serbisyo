import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { FormEvent, useState } from "react";
import { auth } from "../../app/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useRegister from "../../hooks/auth/useRegister";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import GoogleAuth from "./GoogleAuth";

interface Props {}

function Register({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { isLoading, error, register } = useRegister();
	const navigate = useNavigate();

	// get the current user if there is
	const { user } = useAuthContext();

	// if already logged in
	if (user) {
		return <Navigate to='/' />;
	}

	// function for onChange events
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevValue) => ({
			...prevValue,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// register user and if successful redirect to home page
		await register({ ...formData });

		if (!isLoading && !error) {
			navigate("/");
		}
	};

	return (
		<div>
			<h1>Register</h1>
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
				{/* if there is an error, display a message */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{isLoading ? (
					<button type='submit' disabled>
						loading...
					</button>
				) : (
					<button type='submit'>Register</button>
				)}
			</form>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>

			<p>Or</p>

			<GoogleAuth />
		</div>
	);
}

export default Register;
