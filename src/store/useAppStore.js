import { create } from "zustand";
import {
	addPhotoToProfileApi,
	getCurrentUserApi,
	loginApi,
	logoutApi,
	registerApi,
	updateProfileNameApi,
	verifyCodeApi,
} from "../api/autentiphication";

const initialFormData = {
	email: "",
	password: "",
	confirmPassword: "",
	name: "",
	verificationCode: "",
};

export const useAppStore = create((set, get) => ({
	showAuth: false,
	isLogin: true,
	showVerification: false,
	loading: false,
	error: "",
	activePage: "content",
	currentUser: null,
	formData: { ...initialFormData },

	initializeSession: async () => {
		const user = await getCurrentUserApi();
		set({ currentUser: user });
	},

	openAuth: () => set({ showAuth: true }),

	closeAuth: () =>
		set({
			showAuth: false,
			showVerification: false,
			error: "",
			formData: { ...initialFormData },
		}),

	setActivePage: (page) => set({ activePage: page }),

	setFormField: (name, value) =>
		set((state) => ({
			formData: { ...state.formData, [name]: value },
			error: "",
		})),

	toggleAuthMode: () =>
		set((state) => ({
			isLogin: !state.isLogin,
			showVerification: false,
			error: "",
			formData: { ...initialFormData },
		})),

	backFromVerification: () => set({ showVerification: false, error: "" }),

	submitAuth: async () => {
		const { isLogin, formData } = get();
		set({ loading: true, error: "" });

		try {
			if (isLogin) {
				const response = await loginApi({
					email: formData.email,
					password: formData.password,
				});
				set({
					currentUser: response.user,
					activePage: "content",
				});
				get().closeAuth();
				return;
			}

			if (formData.password !== formData.confirmPassword) {
				set({ error: "Пароли не совпадают!" });
				return;
			}

			set({ showVerification: true });
		} catch (err) {
			const status = err?.status;
			const errorMessages = {
				403: "Пользователь заблокирован",
				401: "Неправильный email или пароль",
				409: "Пользователь уже существует",
				500: "Ошибка сервера, попробуйте позже",
				0: "Ошибка сети, проверьте подключение",
			};
			set({ error: errorMessages[status] ?? "Произошла ошибка, попробуйте снова" });
		} finally {
			set({ loading: false });
		}
	},

	verifyCodeAndRegister: async () => {
		const { formData } = get();
		set({ loading: true, error: "" });

		try {
			await verifyCodeApi({ code: formData.verificationCode });
			await registerApi({
				email: formData.email,
				password: formData.password,
				name: formData.name,
			});
			const loginResponse = await loginApi({
				email: formData.email,
				password: formData.password,
			});
			set({
				currentUser: loginResponse.user,
				activePage: "content",
			});
			get().closeAuth();
		} catch (err) {
			if (err.status === 400) {
				set({ error: "Неверный код подтверждения" });
			} else if (err.status === 409) {
				set({ error: "Пользователь уже существует" });
			} else {
				set({ error: "Ошибка при проверке кода" });
			}
		} finally {
			set({ loading: false });
		}
	},

	logout: async () => {
		await logoutApi();
		set({ currentUser: null, activePage: "content" });
	},

	changeName: async (name) => {
		const { currentUser } = get();
		if (!currentUser) return;

		set({ loading: true, error: "" });
		try {
			const response = await updateProfileNameApi({
				userId: currentUser.id,
				name,
			});
			set({ currentUser: response.user });
		} catch {
			set({ error: "Не удалось обновить имя" });
		} finally {
			set({ loading: false });
		}
	},

	addGalleryPhoto: async (item) => {
		const { currentUser } = get();
		if (!currentUser) {
			set({ showAuth: true });
			return;
		}

		try {
			const response = await addPhotoToProfileApi({
				userId: currentUser.id,
				photo: {
					id: `gallery-${item.id}`,
					title: item.title,
					description: item.description,
					imageUrl: item.imageUrl,
				},
			});
			set({ currentUser: response.user, error: "" });
		} catch {
			set({ error: "Не удалось добавить фото в профиль" });
		}
	},

	addLocalPhoto: async ({ imageUrl, title }) => {
		const { currentUser } = get();
		if (!currentUser) return;

		try {
			const response = await addPhotoToProfileApi({
				userId: currentUser.id,
				photo: {
					id: `upload-${Date.now()}`,
					title: title?.trim() || "Моё фото",
					description: "Загружено с устройства",
					imageUrl,
				},
			});
			set({ currentUser: response.user, error: "" });
		} catch {
			set({ error: "Не удалось загрузить фото" });
		}
	},
}));
