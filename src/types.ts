export interface IService {
	provider_id: string;
	name: string;
	location: string;
	description: string;
	price: number;
	category: string;
	photo: string;
}

export interface IRequest {
	buyer_id: string;
	service_id: string;
	isApproved: boolean;
	date: Date;
}
