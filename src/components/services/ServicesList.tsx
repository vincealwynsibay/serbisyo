import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../app/firebase";
import ServiceItem from "./ServiceItem";

interface Props {}

function ServicesList({}: Props) {
	const [services, setServices] = useState<any>([]);

	useEffect(() => {
		// fetch services
		async function fetchServices() {
			const querySnapshot = await getDocs(collection(db, "services"));

			setServices(querySnapshot.docs);
		}

		fetchServices();
	}, []);

	return (
		<div>
			{services &&
				services.map((service: any) => (
					<ServiceItem
						key={service.id}
						service={service.data()}
						service_id={service.id}
					/>
				))}
		</div>
	);
}

export default ServicesList;
