import { auth } from "../../app/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

function useLoginWithGoogle() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const loginWithGoogle = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);

			if (!res) {
				throw new Error("Invalid Email or Password");
			}

			console.log(res);

			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, loginWithGoogle };
}

export default useLoginWithGoogle;
