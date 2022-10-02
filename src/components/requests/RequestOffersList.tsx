import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	runTransaction,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

interface Props {}

function RequestOffersList({}: Props) {
	const [requests, setRequests] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuthContext();

	useEffect(() => {
		const getOwnedServices = async () => {
			// get all current services

			if (!user) {
				return null;
			}

			const servicesQuery = query(
				collection(db, "services"),
				where("provider_id", "==", user.uid)
			);
			const servicesSnapshot = await getDocs(servicesQuery);

			const servicesQueryResults: any = [];
			servicesSnapshot.forEach((doc) => {
				servicesQueryResults.push(doc);
			});
			return servicesQueryResults;
		};

		const fetchOffers = async () => {
			const services = await getOwnedServices();
			services.forEach(async (serviceRef: any) => {
				// fetch requests filtered by service id
				// get the service data

				const service = serviceRef.data();
				const requestsQuery = query(
					collection(db, "requests"),
					where("service_id", "==", serviceRef.id)
				);
				const requestsSnapshot = await getDocs(requestsQuery);
				const requestsQueryResults: any = [];
				requestsSnapshot.forEach((doc) => {
					requestsQueryResults.push(doc);
				});
				if (!requests.find((req: any) => req.id === serviceRef.id)) {
					setRequests((prevValue: any) => [
						...prevValue,
						{ id: serviceRef.id, service, requestsQueryResults },
					]);
				}
			});
		};
		fetchOffers();
	}, [requests]);

	const approveRequest = async (e: any, request_id: any) => {
		setIsLoading(true);
		const requestRef = doc(db, "requests", request_id);
		const request = await getDoc(requestRef);
		await updateDoc(requestRef, {
			isApproved: !request.data()!.isApproved,
		});

		// TODO: CHANGE STATE TO UPDATE THE REQUESTS LIST
		const arr = requests.map((req: any) => {
			console.log(req.requestsQueryResults[0].data());

			req.requestsQueryResults.map(
				(ele: any) => ele.data().id === request_id
			);
		});
		// console.log(arr[0].requestsQueryResults[0].data());

		// setRequests((prevValue: any) =>
		// 	prevValue.map((req: any) => {
		// 		if (req.id === request_id) {
		// 			return { ...req, isApproved: !request.data()!.isApproved };
		// 		} else {
		// 			return req;
		// 		}
		// 	})
		// );

		// setRequests(arr);
		setIsLoading(false);
	};

	return (
		<div>
			<h2>RequestOffersList</h2>
			{requests.map((request: any, idx: any) => {
				return (
					<div key={idx}>
						<h3>{request.service.title}</h3>
						{request.requestsQueryResults.map(
							(requestOfferRef: any) => {
								const requestOfferData = requestOfferRef.data();
								return (
									<div key={requestOfferRef.id}>
										<p>{requestOfferData.service_id}</p>
										<p>
											{requestOfferData.isApproved
												? "nice"
												: "not nice"}
										</p>
										<button
											onClick={(e) =>
												approveRequest(
													e,
													requestOfferRef.id
												)
											}
										>
											Approve Request
										</button>
									</div>
								);
							}
						)}
					</div>
				);
			})}
		</div>
	);
}

export default RequestOffersList;
