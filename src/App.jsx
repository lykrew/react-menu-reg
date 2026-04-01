import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Profile from "./components/Profile";
import { galleryItems } from "./data/galleryItems";
import { useAppStore } from "./store/useAppStore";

function App() {
	const {
		showAuth,
		isLogin,
		showVerification,
		loading,
		error,
		activePage,
		currentUser,
		formData,
		initializeSession,
		openAuth,
		closeAuth,
		setFormField,
		submitAuth,
		verifyCodeAndRegister,
		toggleAuthMode,
		backFromVerification,
		logout,
		setActivePage,
		addGalleryPhoto,
		changeName,
		addLocalPhoto,
	} = useAppStore();

	useEffect(() => {
		initializeSession();
	}, [initializeSession]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await submitAuth();
	};

	const handleVerifyCode = async (e) => {
		e.preventDefault();
		await verifyCodeAndRegister();
	};

	return (
		<div className="app">
			<Navbar
				onLoginClick={openAuth}
				onLogoutClick={logout}
				onNavigate={setActivePage}
				activePage={activePage}
				isLoggedIn={Boolean(currentUser)}
				userName={currentUser?.name}
			/>
			{activePage === "content" && (
				<>
					<Hero />
					<Gallery
						items={galleryItems}
						onAddPhoto={addGalleryPhoto}
						isLoggedIn={Boolean(currentUser)}
					/>
				</>
			)}
			{activePage === "profile" && currentUser && (
				<Profile
					user={currentUser}
					onChangeName={changeName}
					onUploadPhoto={addLocalPhoto}
					loading={loading}
				/>
			)}
			<Footer />
			{showAuth && (
				<AuthModal
					isLogin={isLogin}
					showVerification={showVerification}
					loading={loading}
					error={error}
					formData={formData}
					onInputChange={(e) => setFormField(e.target.name, e.target.value)}
					onSubmit={handleSubmit}
					onVerify={handleVerifyCode}
					onClose={closeAuth}
					onToggleMode={toggleAuthMode}
					onBack={backFromVerification}
				/>
			)}
		</div>
	);
}

export default App;
