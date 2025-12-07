export default function TextArea(props) {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">
                {props.label}
            </label>
            <textarea
                type="text"
                className="form-control"
                id={props.id}
                rows={props.rows}
                value={props.value}
                onChange={(event) => {
                    props.onChange(event.target.value);
                }}
            />
        </div>
    );
}