import { useRef } from "react";

const CodeInput = ({ value, onChange, disabled }) => {
	const code = value || "";
	const inputsRef = useRef([]);

	const handleChange = (index, newChar) => {
		const digit = newChar.replace(/\D/g, "").slice(0, 1);

		const parts = code.split("");
		parts[index] = digit;

		const result = parts.join("").slice(0, 6);
		onChange(result);

		if (digit && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index, event) => {
		if (event.key === "Backspace" && !code[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<div className="code-input">
			{Array.from({ length: 6 }).map((_, index) => (
				<input
					key={index}
					type="text"
					maxLength={1}
					inputMode="numeric"
					className="code-input-item"
					value={code[index] || ""}
					onChange={(e) => handleChange(index, e.target.value)}
					onKeyDown={(event) => handleKeyDown(index, event)}
					ref={(el) => {
						inputsRef.current[index] = el;
					}}
					disabled={disabled}
				/>
			))}
		</div>
	);
};

export default CodeInput;

