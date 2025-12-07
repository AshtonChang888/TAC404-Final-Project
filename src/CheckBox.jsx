export default function CheckBox(props) {
    return (
        <div className="form-check mb-3">
            <input
                className="form-check-input"
                type="checkbox"
                id={props.id}
                checked={props.checked}
                onChange={(event) => 
                    props.onChange(event.target.checked)
                }
            />
            <label htmlFor={props.id} className="form-check-label">
                {props.label}
            </label>
        </div>
    );
}