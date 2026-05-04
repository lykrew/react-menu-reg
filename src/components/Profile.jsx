import { useState } from "react";

export default function Profile({
	user,
	onChangeName,
	onUploadPhoto,
	onRemovePhoto,
	loading,
}) {
	const MAX_FILE_SIZE = 5 * 1024 * 1024;
	const [newName, setNewName] = useState("");
	const [uploadTitle, setUploadTitle] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [error, setError] = useState("");

	const handleChangeName = async () => {
		if (!newName.trim()) {
			setError("Введите новое имя");
			return;
		}
		setError("");
		await onChangeName(newName);
		setNewName("");
	};

	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setError("Можно выбрать только изображение");
			return;
		}
		if (file.size > MAX_FILE_SIZE) {
			setError("Размер файла должен быть не больше 5MB");
			return;
		}

		setError("");
		setSelectedFile(file);
		if (!uploadTitle.trim()) {
			const cleanName = file.name.replace(/\.[^/.]+$/, "");
			setUploadTitle(cleanName);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			setError("Сначала выберите фото");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = async () => {
			try {
				await onUploadPhoto({
					imageUrl: reader.result,
					title: uploadTitle,
				});
				setSelectedFile(null);
				setUploadTitle("");
				setError("");
			} catch {
				setError("Не удалось загрузить фото");
			}
		};
		reader.readAsDataURL(selectedFile);
	};

	return (
		<section className="profile-page">
			<div className="profile-card">
				<h2>{user.name}</h2>
				<p className="profile-email">{user.email}</p>
				<div className="profile-edit">
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						placeholder="Новое имя"
						disabled={loading}
					/>
					<button onClick={handleChangeName} disabled={loading}>
						Сменить имя
					</button>
				</div>
				{error && <div className="error-message">{error}</div>}
			</div>

			<div className="profile-photos">
				<h3>Мои фотографии</h3>
				<div className="profile-upload">
					<input
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						disabled={loading}
					/>
					<input
						type="text"
						value={uploadTitle}
						onChange={(e) => setUploadTitle(e.target.value)}
						placeholder="Название фото"
						disabled={loading}
					/>
					<button onClick={handleUpload} disabled={loading}>
						Загрузить с компьютера
					</button>
				</div>
				{user.photos.length === 0 ? (
					<p className="profile-empty">Вы пока ничего не добавили</p>
				) : (
					<div className="profile-photos-grid">
						{user.photos.map((photo) => (
							<div key={photo.id} className="profile-photo-item">
								<img src={photo.imageUrl} alt={photo.title} />
								<div className="profile-photo-meta">
									<p>{photo.title}</p>
									<button
										className="photo-delete-btn"
										onClick={() => onRemovePhoto(photo.id)}
										disabled={loading}
									>
										Удалить
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}