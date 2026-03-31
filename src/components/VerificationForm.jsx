import CodeInput from "./CodeInput";

const VerificationForm = ({
	loading,
	error,
	formData,
	onInputChange,
	onVerify,
	onBack,
}) => (
	<>
		<h2>Подтверждение</h2>
		<p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
			Введите код подтверждения (123456)
		</p>

		{error && <div className="error-message">{error}</div>}

		<form onSubmit={onVerify}>
			<div className="form-group">
				<label htmlFor="verificationCode">Код подтверждения</label>
				<CodeInput
					value={formData.verificationCode}
					onChange={(code) =>
						onInputChange({
							target: { name: "verificationCode", value: code },
						})
					}
					disabled={loading}
				/>
			</div>

			<button type="submit" className="submit-btn" disabled={loading}>
				{loading ? "Проверка..." : "Подтвердить"}
			</button>
		</form>

		<p className="toggle-auth">
			<button onClick={onBack} className="toggle-btn" disabled={loading}>
				Назад
			</button>
		</p>
	</>
);

export default VerificationForm;

