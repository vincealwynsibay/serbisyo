import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
	const context: any = useContext(AuthContext);

	if (!context) {
		throw new Error("Component should be inside AuthContext Provider");
	}

	return context;
}
