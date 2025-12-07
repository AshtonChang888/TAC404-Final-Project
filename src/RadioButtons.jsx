export default function RadioButtons(props) {
    return (
        <div className="mb-3">
            <div className="mb-3">
                {props.title}
            </div>
            {props.options.map((option) => (
                <div className="form-check form-check-inline">
                    <input
                        className={`form-check-input ${props.isInvalid ? "is-invalid" : ""}`}
                        type="radio"
                        name={props.name}
                        id={`${option.value}-${props.name}`}
                        checked={props.value === option.value}
                        onChange={() => {
                            props.onChange(option.value);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`${option.value}-${props.name}`}
                    >
                        {option.label}
                    </label>
                </div>
            ))}
            {props.isInvalid && (
                <div className="invalid-feedback">
                    {props.errorMsg}
                </div>
            )}
        </div>
    );
}