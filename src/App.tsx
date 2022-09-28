import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import RoleForm from "./components/profile/RoleForm";
import { useAuthContext } from "./hooks/auth/useAuthContext";
function App() {
	const { isAuthReady, user } = useAuthContext();

	// check if auth is already checked
	return (
		<div>
			{isAuthReady ? (
				<div>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path='/' element={<div>Home</div>} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</BrowserRouter>
				</div>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default App;
