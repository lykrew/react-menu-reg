const Navbar = ({ onLoginClick }) => (
	<nav className="navbar">
		<div className="logo">PhotoGallery</div>
		<div className="nav-buttons">
			<button
				className="nav-btn"
				onClick={() => alert("Галерея загружается...")}
			>
				Галерея
			</button>
			<button className="nav-btn" onClick={() => alert("О нас...")}>
				О нас
			</button>
			<button className="nav-btn login-btn" onClick={onLoginClick}>
				Войти
			</button>
		</div>
	</nav>
);

export default Navbar;

