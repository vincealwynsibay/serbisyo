import React from "react";
import useLoginWithGoogle from "../../hooks/auth/useLoginWithGoogle";

interface Props {}

function GoogleAuth({}: Props) {
	const { loginWithGoogle } = useLoginWithGoogle();

	return (
		<div>
			<button onClick={loginWithGoogle}>Login With Google</button>
		</div>
	);
}

export default GoogleAuth;
