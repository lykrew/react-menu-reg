const PhotoDetails = ({ item, onBack, onAddPhoto, isLoggedIn }) => {
	if (!item) {
		return (
			<section className="details-page">
				<div className="details-card">
					<h2>Фото не найдено</h2>
					<button className="nav-btn" onClick={onBack}>
						Вернуться в галерею
					</button>
				</div>
			</section>
		);
	}

	return (
		<section className="details-page">
			<div className="details-card">
				<img src={item.imageUrl} alt={item.title} className="details-image" />
				<div className="details-content">
					<h2>{item.title}</h2>
					<p>{item.description}</p>
					<div className="details-actions">
						<button className="nav-btn" onClick={onBack}>
							Назад
						</button>
						<button
							className="add-photo-btn"
							onClick={() => onAddPhoto?.(item)}
							disabled={!isLoggedIn}
						>
							Добавить в профиль
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PhotoDetails;
