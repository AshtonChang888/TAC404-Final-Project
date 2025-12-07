import "bootstrap/dist/css/bootstrap.css";

export default function Dropdown(props) {
    return (
        <div className="mb-3">
            <label
                className="form-label"
                htmlFor={props.label}
            >
                {props.label}
            </label>
            <select
                className={`form-select ${props.isInvalid ? "is-invalid" : ""}`}
                id={props.label}
                value={props.value}
                onChange={(event) => {
                    props.onChange(event.target.value);
                }}
            >
                {props.choices.map((choice) => {
                    return <option 
                                key={choice.value}
                                value={choice.value}
                            >
                                {choice.label}
                            </option>
                })}
            </select>
            {props.isInvalid && (
                <div className="invalid-feedback">
                    {props.errorMsg}
                </div>
            )}
        </div>
    )
}