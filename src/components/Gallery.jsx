import { useState } from "react";

const GalleryItem = ({ item, onAddPhoto, isLoggedIn }) => {
	const [imageError, setImageError] = useState(false);

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
				className="add-photo-btn"
				onClick={() => onAddPhoto?.(item)}
				disabled={!isLoggedIn}
				title={isLoggedIn ? "Добавить в профиль" : "Сначала войдите в аккаунт"}
			>
				Добавить в профиль
			</button>
		</div>
	);
};

const Gallery = ({ items, onAddPhoto, isLoggedIn }) => (
	<section className="gallery">
		<h2>Популярные работы</h2>
		<div className="gallery-grid">
			{items.map((item) => (
				<GalleryItem
					key={item.id}
					item={item}
					onAddPhoto={onAddPhoto}
					isLoggedIn={isLoggedIn}
				/>
			))}
		</div>
	</section>
);

export default Gallery;

