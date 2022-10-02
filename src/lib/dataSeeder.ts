import { db } from "./../app/firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	setDoc,
} from "firebase/firestore";
import servicesData from "./mockData/services.json";
import { IService } from "../types";

export async function seedServices() {
	const services: IService[] = [];

	const collectionRef = collection(db, "services");

	// delete all services
	const querySnapshot = await getDocs(collectionRef);
	querySnapshot.forEach(async (document) => {
		await deleteDoc(doc(db, "services", document.id));
	});

	// add services
	for (const service of servicesData) {
		await addDoc(collectionRef, {
			provider_id: "TI8U2KNJfGPRUK138xbY84KE5At2",
			name: service.name,
			location: service.location,
			description: service.description,
			price: service.price,
			category: service.category,
			photo: null,
		});
	}

	return services;
}

seedServices();
