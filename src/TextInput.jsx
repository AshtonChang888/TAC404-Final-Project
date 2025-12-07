export default function TextInput(props) {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">
                {props.label}
            </label>
            <input
                type="text"
                id={props.id}
                className="form-control"
                value={props.value}
                onChange={(event) => {
                    props.onChange(event.target.value);
                }}
            />
        </div>
    )
}