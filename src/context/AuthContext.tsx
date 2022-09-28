import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../app/firebase";

export const AuthContext: any = createContext({});

interface Props {
	children: JSX.Element;
}

interface IAuth {
	isAuthReady: boolean;
	user: any;
	loading: boolean;
}

const initialState: IAuth = {
	isAuthReady: false,
	user: null,
	loading: false,
};

export function authReducer(state: any, action: any) {
	switch (action.type) {
		case "READY_AUTH":
			return { ...state, isAuthReady: true, user: action.payload };
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
}

export function AuthProvider({ children }: Props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		// check if user is logged in
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch({ type: "READY_AUTH", payload: user });
			} else {
				dispatch({ type: "READY_AUTH", payload: null });
			}
		});

		return () => unsub();
	}, []);

	console.log(state.user);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
