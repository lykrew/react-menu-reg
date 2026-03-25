import { useState } from "react";

const GalleryItem = ({ item }) => {
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
		</div>
	);
};

const Gallery = ({ items }) => (
	<section className="gallery">
		<h2>Популярные работы</h2>
		<div className="gallery-grid">
			{items.map((item) => (
				<GalleryItem key={item.id} item={item} />
			))}
		</div>
	</section>
);

export default Gallery;

