import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { IService } from "../../types";

interface Props {}

function CreateServiceForm({}: Props) {
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		description: "",
		price: "",
		category: "",
		photo: "",
	});

	const { user } = useAuthContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevVal) => ({
			...prevVal,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const collectionRef = collection(db, "services");

		const serviceObject: IService = {
			provider_id: user?.uid,
			...formData,
			price: parseInt(formData.price),
		};

		await addDoc(collectionRef, serviceObject);
		console.log(formData);
	};

	return (
		<div>
			<h1>Create Service</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>name</label>
					<input type='text' name='name' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>location</label>
					<input
						type='text'
						name='location'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>description</label>
					<input
						type='text'
						name='description'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>price</label>
					<input type='number' name='price' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>category</label>
					<input
						type='text'
						name='category'
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Create Service</button>
			</form>
		</div>
	);
}

export default CreateServiceForm;
