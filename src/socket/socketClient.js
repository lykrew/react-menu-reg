import { io } from "socket.io-client";

let socket = null;

function getSocketUrl() {
	return import.meta.env.VITE_SOCKET_URL;
}

export function connectSocket() {
	if (socket) return socket;

	const url = getSocketUrl();
	if (!url) return null;

	socket = io(url, {
		autoConnect: false,
		transports: ["websocket"],
	});

	socket.connect();
	return socket;
}

export function disconnectSocket() {
	if (!socket) return;
	socket.disconnect();
	socket = null;
}

export function getSocket() {
	return socket;
}

