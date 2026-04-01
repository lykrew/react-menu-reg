const USERS_KEY = "mock_users";
const SESSION_KEY = "mock_session";
const DEFAULT_PASSWORD = "123456";
const DEFAULT_AVATAR =
	"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80&fit=crop";

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

function readUsers() {
	const raw = localStorage.getItem(USERS_KEY);
	if (!raw) return [];
	try {
		return JSON.parse(raw);
	} catch {
		return [];
	}
}

function writeUsers(users) {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(userId) {
	localStorage.setItem(SESSION_KEY, userId);
}

function readSessionUserId() {
	return localStorage.getItem(SESSION_KEY);
}

function publicUser(user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		photos: user.photos ?? [],
	};
}

function findUserByEmail(email) {
	return readUsers().find((user) => user.email === email.toLowerCase());
}

export async function registerApi(payload) {
	await delay();
	const { email, password, name } = payload;
	const normalizedEmail = email.toLowerCase();
	const users = readUsers();

	if (users.some((u) => u.email === normalizedEmail)) {
		throw { status: 409, message: "User already exists" };
	}

	const user = {
		id: `user-${Date.now()}`,
		email: normalizedEmail,
		name: name?.trim() || "Новый пользователь",
		password,
		photos: [
			{
				id: "default-photo",
				title: "Мой первый снимок",
				description: "Фото профиля по умолчанию",
				imageUrl: DEFAULT_AVATAR,
			},
		],
	};

	users.push(user);
	writeUsers(users);
	return { success: true, user: publicUser(user) };
}

export async function loginApi(payload) {
	await delay();
	const { email, password } = payload;
	const normalizedEmail = email.toLowerCase();

	if (normalizedEmail === "blocked@example.com") {
		throw { status: 403, message: "User is blocked" };
	}

	const user = findUserByEmail(normalizedEmail);
	if (!user) {
		throw { status: 401, message: "Wrong password or email" };
	}

	if (normalizedEmail === "server@example.com") {
		throw { status: 500, message: "Server error" };
	}

	if (normalizedEmail === "network@example.com") {
		throw { status: 0, message: "Network error" };
	}

	if (user.password !== password) {
		throw { status: 401, message: "Wrong password or email" };
	}

	saveSession(user.id);
	return { success: true, user: publicUser(user) };
}

export async function verifyCodeApi(payload) {
	await delay(350);
	if (payload.code !== DEFAULT_PASSWORD) {
		throw { status: 400, message: "invalid code" };
	}
	return { success: true };
}

export async function getCurrentUserApi() {
	await delay(200);
	const sessionUserId = readSessionUserId();
	if (!sessionUserId) return null;
	const user = readUsers().find((item) => item.id === sessionUserId);
	return user ? publicUser(user) : null;
}

export async function logoutApi() {
	await delay(120);
	localStorage.removeItem(SESSION_KEY);
	return { success: true };
}

export async function updateProfileNameApi(payload) {
	await delay();
	const { userId, name } = payload;
	const users = readUsers();
	const user = users.find((item) => item.id === userId);
	if (!user) throw { status: 404, message: "User not found" };
	user.name = name.trim();
	writeUsers(users);
	return { success: true, user: publicUser(user) };
}

export async function addPhotoToProfileApi(payload) {
	await delay(250);
	const { userId, photo } = payload;
	const users = readUsers();
	const user = users.find((item) => item.id === userId);
	if (!user) throw { status: 404, message: "User not found" };

	const hasPhoto = user.photos.some((item) => item.id === photo.id);
	if (!hasPhoto) {
		user.photos.unshift(photo);
		writeUsers(users);
	}

	return { success: true, user: publicUser(user) };
}
