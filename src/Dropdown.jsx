import "bootstrap/dist/css/bootstrap.css";

export default function Dropdown(props) {
    return (
        <div>
            <label
                className="form-label"
                htmlFor={props.label}
            >
                {props.label}
            </label>
            <select
                className="form-select"
                id={props.label}
                value={props.value}
                onChange={(event) => {
                    props.onChange(event.target.value);
                }}
            >
                {props.choices.map((choice) => {
                    return <option value={choice.value}>{choice.label}</option>
                })}
            </select>
        </div>
    )
}