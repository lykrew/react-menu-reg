import { useState } from "react";

const GalleryItem = ({ item, onAddPhoto, onOpenDetails, isLoggedIn }) => {
	const [imageError, setImageError] = useState(false);
	const [status, setStatus] = useState("");

	const handleAddPhoto = async () => {
		const result = await onAddPhoto?.(item);
		if (result?.success) {
			setStatus("Фото добавлено");
			setTimeout(() => setStatus(""), 2000);
			return;
		}
		if (result?.reason === "exists") {
			setStatus("Уже добавлено");
			setTimeout(() => setStatus(""), 2000);
		}
	};

	return (
		<div className="gallery-item">
			<div className="image-placeholder">
				{!imageError ? (
					<img
						src={item.imageUrl}
						alt={item.title}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="image-fallback">Нет изображения</div>
				)}
			</div>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
			<button
				className="add-photo-btn secondary-btn"
				onClick={() => onOpenDetails?.(item.id)}
			>
				Подробнее
			</button>
			<button
				className="add-photo-btn"
				onClick={handleAddPhoto}
				disabled={!isLoggedIn}
				title={isLoggedIn ? "Добавить в профиль" : "Сначала войдите в аккаунт"}
			>
				Добавить в профиль
			</button>
			{status && <p className="success-message">{status}</p>}
		</div>
	);
};

const Gallery = ({ items, onAddPhoto, onOpenDetails, isLoggedIn }) => (
	<section className="gallery">
		<h2>Популярные работы</h2>
		<div className="gallery-grid">
			{items.map((item) => (
				<GalleryItem
					key={item.id}
					item={item}
					onAddPhoto={onAddPhoto}
					onOpenDetails={onOpenDetails}
					isLoggedIn={isLoggedIn}
				/>
			))}
		</div>
	</section>
);

export default Gallery;

