// App.js
import { useState } from "react";
import { loginApi, verifyCodeApi } from "./api/autentiphication"; // импортируем ваши функции
import "./App.css";

function App() {
	const [showAuth, setShowAuth] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [showVerification, setShowVerification] = useState(false); // для этапа подтверждения
	const [loading, setLoading] = useState(false); // для индикации загрузки
	const [error, setError] = useState(""); // для ошибок
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		verificationCode: "", // код подтверждения
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Очищаем ошибку при вводе
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (isLogin) {
				// Логин через API
				const result = await loginApi({
					email: formData.email,
					password: formData.password,
				});

				console.log("Login success:", result);
				alert(`✨ Добро пожаловать, ${formData.email}!`);
				closeAuth();
			} else {
				// Регистрация (проверка паролей)
				if (formData.password !== formData.confirmPassword) {
					setError("❌ Пароли не совпадают!");
					setLoading(false);
					return;
				}

				// После успешной регистрации показываем окно верификации
				setShowVerification(true);
				setLoading(false);
			}
		} catch (err) {
			// Обработка ошибок от API
			console.error("Auth error:", err);

			if (err.status === 403) {
				setError("❌ Пользователь заблокирован");
			} else if (err.status === 401) {
				setError("❌ Неправильный email или пароль");
			} else if (err.status === 500) {
				setError("❌ Ошибка сервера, попробуйте позже");
			} else if (err.status === 0) {
				setError("❌ Ошибка сети, проверьте подключение");
			} else {
				setError("❌ Произошла ошибка, попробуйте снова");
			}
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

			alert(
				`🎉 Регистрация успешна, ${formData.name || formData.email}!`,
			);
			closeAuth();
		} catch (err) {
			if (err.status === 400) {
				setError("❌ Неверный код подтверждения");
			} else {
				setError("❌ Ошибка при проверке кода");
			}
		} finally {
			setLoading(false);
		}
	};

	const closeAuth = () => {
		setShowAuth(false);
		setShowVerification(false);
		setError("");
		setFormData({
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
			verificationCode: "",
		});
	};

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
		setShowVerification(false);
		setError("");
		setFormData({
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
			verificationCode: "",
		});
	};

	// Массив с данными для галереи
	const galleryItems = [
		{
			id: 1,
			title: "Горный пейзаж",
			description: "Величественные вершины Кавказа в утреннем тумане",
			imageUrl: "/1.jpg",
		},
		{
			id: 2,
			title: "Морское побережье",
			description: "Закат на побережье Черного моря",
			imageUrl: "/2.jpg",
		},
		{
			id: 3,
			title: "Городская архитектура",
			description: "Ночной город в огнях небоскребов",
			imageUrl: "/3.jpg",
		},
		{
			id: 4,
			title: "Лесная тропа",
			description: "Таинственный лес в золотую осень",
			imageUrl: "/4.jpg",
		},
		{
			id: 5,
			title: "Звездное небо",
			description: "Млечный путь над горным озером",
			imageUrl: "/5.png",
		},
		{
			id: 6,
			title: "Цветущий сад",
			description: "Весеннее цветение японской сакуры",
			imageUrl: "/6.jpg",
		},
	];

	return (
		<div className="app">
			{/* Навигация */}
			<nav className="navbar">
				<div className="logo">PhotoGallery</div>
				<div className="nav-buttons">
					<button
						className="nav-btn"
						onClick={() => alert("Галерея загружается...")}
					>
						Галерея
					</button>
					<button
						className="nav-btn"
						onClick={() => alert("О нас...")}
					>
						О нас
					</button>
					<button
						className="nav-btn login-btn"
						onClick={() => setShowAuth(true)}
					>
						Войти
					</button>
				</div>
			</nav>

			{/* Герой секция */}
			<section className="hero">
				<h1>Добро пожаловать в PhotoGallery</h1>
				<p>
					Откройте для себя удивительный мир фотографии и вдохновения
				</p>
			</section>

			{/* Галерея */}
			<section className="gallery">
				<h2>Популярные работы</h2>
				<div className="gallery-grid">
					{galleryItems.map((item) => (
						<div key={item.id} className="gallery-item">
							<div className="image-placeholder">
								<img
									src={item.imageUrl}
									alt={item.title}
									onError={(e) => {
										e.target.style.display = "none";
										e.target.parentElement.innerHTML +=
											"<span>📸</span>";
									}}
								/>
							</div>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Футер */}
			<footer className="footer">
				<p>© 2024 PhotoGallery. Все права защищены.</p>
				<p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
					Сделано с ❤️ для ценителей прекрасного
				</p>
			</footer>

			{/* Модальное окно авторизации */}
			{showAuth && (
				<div className="auth-modal-overlay" onClick={closeAuth}>
					<div
						className="auth-modal"
						onClick={(e) => e.stopPropagation()}
					>
						<button className="close-btn" onClick={closeAuth}>
							×
						</button>

						{!showVerification ? (
							// Форма входа/регистрации
							<>
								<h2>{isLogin ? "Вход" : "Регистрация"}</h2>

								{error && (
									<div className="error-message">{error}</div>
								)}

								<form onSubmit={handleSubmit}>
									{!isLogin && (
										<div className="form-group">
											<label htmlFor="name">Имя</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required={!isLogin}
												placeholder="Введите ваше имя"
												disabled={loading}
											/>
										</div>
									)}

									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											placeholder="example@mail.com"
											disabled={loading}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="password">Пароль</label>
										<input
											type="password"
											id="password"
											name="password"
											value={formData.password}
											onChange={handleInputChange}
											required
											placeholder="Минимум 6 символов"
											minLength={6}
											disabled={loading}
										/>
									</div>

									{!isLogin && (
										<div className="form-group">
											<label htmlFor="confirmPassword">
												Подтвердите пароль
											</label>
											<input
												type="password"
												id="confirmPassword"
												name="confirmPassword"
												value={formData.confirmPassword}
												onChange={handleInputChange}
												required={!isLogin}
												placeholder="Повторите пароль"
												minLength={6}
												disabled={loading}
											/>
										</div>
									)}

									<button
										type="submit"
										className="submit-btn"
										disabled={loading}
									>
										{loading
											? "Загрузка..."
											: isLogin
												? "Войти"
												: "Зарегистрироваться"}
									</button>
								</form>

								<p className="toggle-auth">
									{isLogin
										? "Нет аккаунта?"
										: "Уже есть аккаунт?"}
									<button
										onClick={toggleAuthMode}
										className="toggle-btn"
										disabled={loading}
									>
										{isLogin
											? "Зарегистрироваться"
											: "Войти"}
									</button>
								</p>
							</>
						) : (
							// Форма подтверждения кода
							<>
								<h2>Подтверждение</h2>
								<p
									style={{
										color: "#9ca3af",
										marginBottom: "1rem",
									}}
								>
									Введите код подтверждения (123456)
								</p>

								{error && (
									<div className="error-message">{error}</div>
								)}

								<form onSubmit={handleVerifyCode}>
									<div className="form-group">
										<label htmlFor="verificationCode">
											Код подтверждения
										</label>
										<input
											type="text"
											id="verificationCode"
											name="verificationCode"
											value={formData.verificationCode}
											onChange={handleInputChange}
											required
											placeholder="Введите код"
											maxLength={6}
											disabled={loading}
										/>
									</div>

									<button
										type="submit"
										className="submit-btn"
										disabled={loading}
									>
										{loading
											? "Проверка..."
											: "Подтвердить"}
									</button>
								</form>

								<p className="toggle-auth">
									<button
										onClick={() =>
											setShowVerification(false)
										}
										className="toggle-btn"
										disabled={loading}
									>
										← Назад
									</button>
								</p>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
