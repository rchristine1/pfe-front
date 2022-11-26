function FormButton(props) {
    let toggleTitle = props.toggleTitle
    let valueInput = props.valueInput
    let activeButton = props.activeButton
    let campaignStyle = { color: '#ffff', backgroundColor: '#609f9f' }

    if (activeButton === true) {
        return (
            <input id={valueInput}
                className="btn btn-sm btn-block w-100 fw-bold Hover"
                type="submit" value={valueInput} style={campaignStyle} toggle="tooltip"
                title={toggleTitle} />
        )
    } else {
        return (<input id={valueInput}
            className="btn btn-secondary btn-sm btn-block w-100 border border-3 fw-bold"
            type="submit" value={valueInput} style={campaignStyle} toggle="tooltip"
            title={toggleTitle} disabled />
        )

    }

}
export default FormButton;