import React from "react";
import { Link } from "react-router-dom";

interface Props {
	service: any;
	service_id: number;
}

function ServiceItem({ service, service_id }: Props) {
	return (
		<div>
			<Link to={`/services/${service_id}`}>{service.name}</Link>
		</div>
	);
}

export default ServiceItem;
