import { useState } from "react";
import "./App.css";

function App() {
	const [showAuth, setShowAuth] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			console.log("Login attempt:", {
				email: formData.email,
				password: formData.password,
			});
			alert(`Вход выполнен: ${formData.email}`);
		} else {
			if (formData.password !== formData.confirmPassword) {
				alert("Пароли не совпадают!");
				return;
			}
			console.log("Registration attempt:", formData);
			alert(`Регистрация успешна: ${formData.name}`);
		}

		setShowAuth(false);

		setFormData({
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
		});
	};

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
		setFormData({
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
		});
	};

	return (
		<>
			{}
			<button
				className="auth-toggle-btn"
				onClick={() => setShowAuth(!showAuth)}
			>
				{showAuth ? "Закрыть" : "Вход / Регистрация"}
			</button>

			{}
			{showAuth && (
				<div
					className="auth-modal-overlay"
					onClick={() => setShowAuth(false)}
				>
					<div
						className="auth-modal"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="close-btn"
							onClick={() => setShowAuth(false)}
						>
							×
						</button>

						<h2>{isLogin ? "Вход" : "Регистрация"}</h2>

						<form onSubmit={handleSubmit}>
							{!isLogin && (
								<div className="form-group">
									<label htmlFor="name">Имя:</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required={!isLogin}
										placeholder="Введите ваше имя"
									/>
								</div>
							)}

							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									placeholder="Введите email"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Пароль:</label>
								<input
									type="password"
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									required
									placeholder="Введите пароль"
									minLength={6}
								/>
							</div>

							{!isLogin && (
								<div className="form-group">
									<label htmlFor="confirmPassword">
										Подтвердите пароль:
									</label>
									<input
										type="password"
										id="confirmPassword"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										required={!isLogin}
										placeholder="Подтвердите пароль"
										minLength={6}
									/>
								</div>
							)}

							<button type="submit" className="submit-btn">
								{isLogin ? "Войти" : "Зарегистрироваться"}
							</button>
						</form>

						<p className="toggle-auth">
							{isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
							<button
								onClick={toggleAuthMode}
								className="toggle-btn"
							>
								{isLogin ? "Зарегистрироваться" : "Войти"}
							</button>
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
