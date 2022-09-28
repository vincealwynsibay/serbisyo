import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../app/firebase";

interface Props {}

interface IUserCredentials {
	email: string;
	password: string;
}

function useRegister() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const register = async (userCredentials: IUserCredentials) => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await createUserWithEmailAndPassword(
				auth,
				userCredentials.email,
				userCredentials.password
			);

			// check if login is valid
			if (!res) {
				throw new Error("Something went Wrong");
			}

			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, register };
}

export default useRegister;
