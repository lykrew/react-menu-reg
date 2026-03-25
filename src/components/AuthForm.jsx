const AuthForm = ({
	isLogin,
	loading,
	error,
	formData,
	onInputChange,
	onSubmit,
	onToggleMode,
}) => (
	<>
		<h2>{isLogin ? "Вход" : "Регистрация"}</h2>

		{error && <div className="error-message">{error}</div>}

		<form onSubmit={onSubmit}>
			{!isLogin && (
				<div className="form-group">
					<label htmlFor="name">Имя</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={onInputChange}
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
					onChange={onInputChange}
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
					onChange={onInputChange}
					required
					placeholder="Минимум 6 символов"
					minLength={6}
					disabled={loading}
				/>
			</div>

			{!isLogin && (
				<div className="form-group">
					<label htmlFor="confirmPassword">Подтвердите пароль</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={onInputChange}
						required={!isLogin}
						placeholder="Повторите пароль"
						minLength={6}
						disabled={loading}
					/>
				</div>
			)}

			<button type="submit" className="submit-btn" disabled={loading}>
				{loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
			</button>
		</form>

		<p className="toggle-auth">
			{isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
			<button
				onClick={onToggleMode}
				className="toggle-btn"
				disabled={loading}
			>
				{isLogin ? "Зарегистрироваться" : "Войти"}
			</button>
		</p>
	</>
);

export default AuthForm;

