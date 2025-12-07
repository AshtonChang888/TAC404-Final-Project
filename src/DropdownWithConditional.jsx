import Dropdown from "./Dropdown"

export default function DropdownWithConditional(props) {
    let childrenKey = props.parent.value;

    return (
        <div className="mb-3">
            <Dropdown
                label={props.parent.label}
                value={props.parent.value}
                choices={props.parent.choices}
                onChange={props.parent.onChange}
                isInvalid={props.parent.isInvalid}
                errorMsg={props.parent.errorMsg}
            />

            {childrenKey && props.children[childrenKey] && (
                <Dropdown
                    label={props.children[childrenKey].label}
                    value={props.children[childrenKey].value}
                    choices={props.children[childrenKey].choices}
                    onChange={props.children[childrenKey].onChange}
                    isInvalid={props.children[childrenKey].isInvalid}
                    errorMsg={props.children[childrenKey].errorMsg}
                />
            )}
        </div>
    )
}