import { useState } from "react";
import { loginApi, verifyCodeApi } from "./api/autentiphication";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { galleryItems } from "./data/galleryItems";

function App() {
	const initialFormData = {
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		verificationCode: "",
	};

	const [showAuth, setShowAuth] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [showVerification, setShowVerification] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		...initialFormData,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (isLogin) {
				await loginApi({
					email: formData.email,
					password: formData.password,
				});

				alert(`Добро пожаловать, ${formData.email}!`);
				closeAuth();
			} else {
				if (formData.password !== formData.confirmPassword) {
					setError("Пароли не совпадают!");
					return;
				}

				setShowVerification(true);
			}
		} catch (err) {
			const status = err?.status;
			const errorMessages = {
				403: "Пользователь заблокирован",
				401: "Неправильный email или пароль",
				500: "Ошибка сервера, попробуйте позже",
				0: "Ошибка сети, проверьте подключение",
			};

			setError(errorMessages[status] ?? "Произошла ошибка, попробуйте снова");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyCode = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await verifyCodeApi({ code: formData.verificationCode });

			alert(`Регистрация успешна, ${formData.name || formData.email}!`);
			closeAuth();
		} catch (err) {
			if (err.status === 400) {
				setError("Неверный код подтверждения");
			} else {
				setError("Ошибка при проверке кода");
			}
		} finally {
			setLoading(false);
		}
	};

	const closeAuth = () => {
		setShowAuth(false);
		setShowVerification(false);
		setError("");

		setFormData({ ...initialFormData });
	};

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
		setShowVerification(false);
		setError("");

		setFormData({ ...initialFormData });
	};

	return (
		<div className="app">
			<Navbar onLoginClick={() => setShowAuth(true)} />
			<Hero />
			<Gallery items={galleryItems} />
			<Footer />
			{showAuth && (
				<AuthModal
					isLogin={isLogin}
					showVerification={showVerification}
					loading={loading}
					error={error}
					formData={formData}
					onInputChange={handleInputChange}
					onSubmit={handleSubmit}
					onVerify={handleVerifyCode}
					onClose={closeAuth}
					onToggleMode={toggleAuthMode}
					onBack={() => setShowVerification(false)}
				/>
			)}
		</div>
	);
}

export default App;
