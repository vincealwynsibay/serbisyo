import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

interface Props {}

function Navbar({}: Props) {
	// get the current user
	const { user } = useAuthContext();

	const navigate = useNavigate();

	// function for logging out user
	const logout = async () => {
		await signOut(auth);
		navigate("/"); // navigate to home page
	};

	return (
		<header>
			<Link to='/'>Serbisyo</Link>
			<nav>
				<ul>
					{user ? (
						// if there is user
						<>
							<li>
								<a href='#' onClick={logout}>
									Logout
								</a>
							</li>
						</>
					) : (
						// if there is no user
						<>
							<li>
								<Link to='/login'>Login</Link>
							</li>
							<li>
								<Link to='/register'>Register</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Navbar;
