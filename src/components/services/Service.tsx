import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../app/firebase";

interface Props {}

function Service({}: Props) {
	const [service, setService] = useState<any>(null);
	const { service_id } = useParams();

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

	console.log(service);

	if (!service) {
		return null;
	}

	return <div>{service.name}</div>;
}

export default Service;
