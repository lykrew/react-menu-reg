const Navbar = ({
	onLoginClick,
	onLogoutClick,
	onGalleryClick,
	onProfileClick,
	currentPath,
	isLoggedIn,
	userName,
}) => (
	<nav className="navbar">
		<div className="logo">PhotoGallery</div>
		<div className="nav-buttons">
			<button
				className={`nav-btn ${currentPath === "/" ? "nav-btn-active" : ""}`}
				onClick={onGalleryClick}
			>
				Галерея
			</button>
			{isLoggedIn && (
				<button
					className={`nav-btn ${currentPath === "/profile" ? "nav-btn-active" : ""}`}
					onClick={onProfileClick}
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

