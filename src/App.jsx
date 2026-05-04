import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Profile from "./components/Profile";
import PhotoDetails from "./components/PhotoDetails";
import { galleryItems } from "./data/galleryItems";
import { useAppStore } from "./store/useAppStore";
import {
	initSocketConnection,
	closeSocketConnection,
} from "./socket/initSocket";

function PhotoDetailsRoute({ onAddPhoto, isLoggedIn }) {
	const { id } = useParams();
	const item = galleryItems.find((photo) => String(photo.id) === id);
	const navigate = useNavigate();

	return (
		<PhotoDetails
			item={item}
			onBack={() => navigate("/")}
			onAddPhoto={onAddPhoto}
			isLoggedIn={isLoggedIn}
		/>
	);
}

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const showAuth = useAppStore((state) => state.showAuth);
	const isLogin = useAppStore((state) => state.isLogin);
	const showVerification = useAppStore((state) => state.showVerification);
	const loading = useAppStore((state) => state.loading);
	const error = useAppStore((state) => state.error);
	const currentUser = useAppStore((state) => state.currentUser);
	const formData = useAppStore((state) => state.formData);
	const initializeSession = useAppStore((state) => state.initializeSession);
	const openAuth = useAppStore((state) => state.openAuth);
	const closeAuth = useAppStore((state) => state.closeAuth);
	const setFormField = useAppStore((state) => state.setFormField);
	const submitAuth = useAppStore((state) => state.submitAuth);
	const verifyCodeAndRegister = useAppStore(
		(state) => state.verifyCodeAndRegister
	);
	const toggleAuthMode = useAppStore((state) => state.toggleAuthMode);
	const backFromVerification = useAppStore((state) => state.backFromVerification);
	const logout = useAppStore((state) => state.logout);
	const addGalleryPhoto = useAppStore((state) => state.addGalleryPhoto);
	const changeName = useAppStore((state) => state.changeName);
	const addLocalPhoto = useAppStore((state) => state.addLocalPhoto);
	const removeProfilePhoto = useAppStore((state) => state.removeProfilePhoto);

	useEffect(() => {
		initializeSession();
	}, [initializeSession]);

	useEffect(() => {
		initSocketConnection();
		return () => closeSocketConnection();
	}, []);

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
				onGalleryClick={() => navigate("/")}
				onProfileClick={() => navigate("/profile")}
				currentPath={location.pathname}
				isLoggedIn={Boolean(currentUser)}
				userName={currentUser?.name}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Hero />
							<Gallery
								items={galleryItems}
								onAddPhoto={addGalleryPhoto}
								onOpenDetails={(id) => navigate(`/gallery/${id}`)}
								isLoggedIn={Boolean(currentUser)}
							/>
						</>
					}
				/>
				<Route
					path="/profile"
					element={
						currentUser ? (
							<Profile
								user={currentUser}
								onChangeName={changeName}
								onUploadPhoto={addLocalPhoto}
								onRemovePhoto={removeProfilePhoto}
								loading={loading}
							/>
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
				<Route
					path="/gallery/:id"
					element={
						<PhotoDetailsRoute
							onAddPhoto={addGalleryPhoto}
							isLoggedIn={Boolean(currentUser)}
						/>
					}
				/>
			</Routes>
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
