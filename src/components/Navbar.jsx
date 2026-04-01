const Navbar = ({
	onLoginClick,
	onLogoutClick,
	onNavigate,
	activePage,
	isLoggedIn,
	userName,
}) => (
	<nav className="navbar">
		<div className="logo">PhotoGallery</div>
		<div className="nav-buttons">
			<button
				className={`nav-btn ${activePage === "content" ? "nav-btn-active" : ""}`}
				onClick={() => onNavigate("content")}
			>
				Галерея
			</button>
			{isLoggedIn && (
				<button
					className={`nav-btn ${activePage === "profile" ? "nav-btn-active" : ""}`}
					onClick={() => onNavigate("profile")}
				>
					Профиль
				</button>
			)}
			{isLoggedIn ? (
				<>
					<span className="nav-user">Привет, {userName}</span>
					<button className="nav-btn login-btn" onClick={onLogoutClick}>
						Выйти
					</button>
				</>
			) : (
				<button className="nav-btn login-btn" onClick={onLoginClick}>
					Войти
				</button>
			)}
		</div>
	</nav>
);

export default Navbar;

