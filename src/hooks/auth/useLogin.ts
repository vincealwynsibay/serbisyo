import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../app/firebase";

interface Props {}

interface IUserCredentials {
	email: string;
	password: string;
}

function useLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const login = async (userCredentials: IUserCredentials) => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await signInWithEmailAndPassword(
				auth,
				userCredentials.email,
				userCredentials.password
			);

			if (!res) {
				throw new Error("Invalid Email or Password");
			} else {
				setError(null);
			}
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, login };
}

export default useLogin;
