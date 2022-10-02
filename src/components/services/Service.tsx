import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { IRequest } from "../../types";

interface Props {}

function Service({}: Props) {
	const [service, setService] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isAlreadyRequested, setIsAlreadyRequested] = useState(false);
	const { service_id } = useParams();
	const { user } = useAuthContext();

	useEffect(() => {
		// fetch service
		const docRef = doc(db, "services", service_id!);
		setService(
			async () =>
				await getDoc(docRef).then((docSnap) =>
					setService(docSnap.data())
				)
		);
	}, []);

	useEffect(() => {
		// check if user has already requested this service
		const check = async () => {
			const res = await getExistingRequest();
			if (res && res.data()) {
				setIsAlreadyRequested(true);
			} else {
				setIsAlreadyRequested(false);
			}
		};
		check();
	}, [isAlreadyRequested, isLoading]);

	const requestService = async () => {
		setIsLoading(true);
		const collectionRef = collection(db, "requests");

		const requestObject: IRequest = {
			service_id: service_id!,
			buyer_id: user.uid,
			isApproved: false,
			date: new Date(),
		};

		await addDoc(collectionRef, requestObject);
		setIsLoading(false);
	};

	const cancelRequest = async () => {
		// check if the user already requested
		setIsLoading(true);
		const existingRequest = await getExistingRequest();
		if (!existingRequest.data()) {
			return null;
		}

		// remove the request
		await deleteDoc(doc(db, "requests", existingRequest.id));
		setIsLoading(false);
	};

	const getExistingRequest = async () => {
		// filters the requests by service_id and current user id
		const requestsRef = collection(db, "requests");
		const requestsQuery = query(
			requestsRef,
			where("service_id", "==", service_id!),
			where("buyer_id", "==", user.uid)
		);

		// array to store the existing request
		const requests: any = [];

		const querySnapshot = await getDocs(requestsQuery);
		querySnapshot.forEach((doc) => {
			requests.push(doc);
		});

		// return the existing request
		return requests[0];
	};

	if (!service) {
		return null;
	}

	return (
		<div>
			<h2>{service.name}</h2>
			<p>{service.price}</p>

			{/* checks if user is not the service provider */}
			{user && user.uid !== service.provider_id && (
				// check if the user already requested
				<>
					{!isAlreadyRequested ? (
						<>
							{!isLoading ? (
								<button onClick={requestService}>
									Request Service
								</button>
							) : (
								<button disabled>loading...</button>
							)}
						</>
					) : (
						<>
							{!isLoading ? (
								<button onClick={cancelRequest}>
									Delete Request
								</button>
							) : (
								<button disabled>loading...</button>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Service;
