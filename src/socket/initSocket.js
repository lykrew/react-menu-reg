import { connectSocket, disconnectSocket } from "./socketClient";
import { useAppStore } from "../store/useAppStore";

let listenersInitialized = false;

export function initSocketConnection() {
	const socket = connectSocket();
	if (!socket) return;

	if (listenersInitialized) return;
	listenersInitialized = true;

	const { setSocketConnected, setSocketError, setCurrentUser, socketLogout } =
		useAppStore.getState();

	socket.on("connect", () => setSocketConnected(true));
	socket.on("disconnect", () => setSocketConnected(false));
	socket.on("connect_error", (err) =>
		setSocketError(err?.message ?? "Socket connect error")
	);
	socket.io.on("error", (err) => setSocketError(err?.message ?? "Socket error"));

	socket.on("user:update", (user) => {
		if (!user) return;
		setCurrentUser(user);
	});

	socket.on("user:logout", () => {
		socketLogout();
	});

	return socket;
}

export function closeSocketConnection() {
	listenersInitialized = false;
	disconnectSocket();
}

