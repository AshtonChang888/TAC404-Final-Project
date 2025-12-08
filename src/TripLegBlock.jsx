export default function TripLegBlock({ data, onDelete }) {
    // const transportTypeLabels = {
    //     "airline": "Airline",
    //     "car_rental": "Car Rental",
    //     "train": "Train"
    // }
    return (
        <div className="card mb-3 p-3">
            <div><strong>Start Date:</strong> {data.startDate} </div>
            <div><strong>Start Location:</strong> {data.startLoc} </div>
            <div><strong>End Location:</strong> {data.endLoc} </div>

            <div><strong>Transport:</strong> {data.transportType}</div>

            {data.transportType === "airline" && <div><strong>Airline:</strong> {data.transportName}</div>}
            {data.transportType === "car_rental" && <div><strong>Car Rental:</strong> {data.transportName}</div>}
            {data.transportType === "train" && <div><strong>Train:</strong> {data.transportName}</div>}

            <div><strong>Accommodation Type:</strong> {data.accommodationType || "N/A"} </div>
        
            {data.accommodationType === "hotel" && (
                <div><strong>Hotel:</strong> {data.hotelName} </div>
            )}

            <div>
                <strong>Already booked accommodation?</strong> {data.accommodationStatus ? "Yes" : "No"}
            </div>

            {data.comments && (
                <div className="mt-2">
                    <strong>Comments:</strong> {data.comments}
                </div>
            )}
            {data.editing && (
                <div>
                    <button 
                        className="btn btn-danger btn-sm position-absolute"
                        onClick={onDelete}
                        style={{ top: "10px", right: "10px" }}
                    >
                        −
                    </button>
                </div>
            )}
        </div>
    )
}