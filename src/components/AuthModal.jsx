import AuthForm from "./AuthForm";
import VerificationForm from "./VerificationForm";

const AuthModal = ({
	isLogin,
	showVerification,
	loading,
	error,
	formData,
	onInputChange,
	onSubmit,
	onVerify,
	onClose,
	onToggleMode,
	onBack,
}) => (
	<div className="auth-modal-overlay" onClick={onClose}>
		<div className="auth-modal" onClick={(e) => e.stopPropagation()}>
			<button className="close-btn" onClick={onClose}>
				×
			</button>

			{!showVerification ? (
				<AuthForm
					isLogin={isLogin}
					loading={loading}
					error={error}
					formData={formData}
					onInputChange={onInputChange}
					onSubmit={onSubmit}
					onToggleMode={onToggleMode}
				/>
			) : (
				<VerificationForm
					loading={loading}
					error={error}
					formData={formData}
					onInputChange={onInputChange}
					onVerify={onVerify}
					onBack={onBack}
				/>
			)}
		</div>
	</div>
);

export default AuthModal;

