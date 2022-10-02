import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import RequestOffersList from "./components/requests/RequestOffersList";
import CreateServiceForm from "./components/services/CreateServiceForm";
import Service from "./components/services/Service";
import ServiceItem from "./components/services/ServiceItem";
import ServicesList from "./components/services/ServicesList";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import { seedServices } from "./lib/dataSeeder";
function App() {
	const { isAuthReady, user } = useAuthContext();

	// testing grounds
	useEffect(() => {
		// seedServices();
	}, []);

	// check if auth is already checked
	return (
		<div>
			{isAuthReady ? (
				<div>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path='/' element={<ServicesList />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route
								path='/services/:service_id'
								element={<Service />}
							/>
						</Routes>
					</BrowserRouter>
					<RequestOffersList />
					<CreateServiceForm />
				</div>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default App;
