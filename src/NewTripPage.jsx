import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import TripLegBlock from "./TripLegBlock";
import RadioButtons from "./RadioButtons";
import DropdownWithConditional from "./DropdownWithConditional";
import CheckBox from "./CheckBox";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

const TRIP_API = `http://localhost:3000`;

function fetchTransport() {
    return fetch(`${TRIP_API}/transport`)
        .then(response => response.json());
}

function fetchHotels() {
    return fetch(`${TRIP_API}/hotels`)
        .then(response => response.json());
}


//Change array to include value, label map instead of id, name
//Also sort alphabetically
//And add "Other" as an extra option, set value to "other"
function structureAndSort(array) {
    const newArray = array.map(item => ({ value: item.id, label: item.name }))
                          .sort((a, b) => a.label.localeCompare(b.label));
    return [{ value: "", label: "Select an option"}, 
            ...newArray,
            { value: "other", label: "Other"}];
}


export default function NewTripPage() {    
    const [tripId, setTripId] = useState(null);
    const [tripName, setTripName] = useState("");
    const [tripLegBlocks, setTripLegBlocks] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [startLoc, setStartLoc] = useState("");
    const [endLoc, setEndLoc] = useState("");

    const [accommodationType, setAccommodationType] = useState("");
    const [hotel, setHotel] = useState("");
    const [hotelMap, setHotelMap] = useState({});

    const [transportMap, setTransportMap] = useState({
        airline: [],
        car_rental: [],
        train: [],
    })
    const [transportType, setTransportType] = useState("");
    const [airline, setAirline] = useState("");
    const [carRental, setCarRental] = useState("");
    const [train, setTrain] = useState("");
    const [comments, setComments] = useState("");
    const [accommodationStatus, setAccommodationStatus] = useState(false);

    const [formErrors, setFormErrors] = useState({});

    function addTripLegBlock(newLeg) {
        setTripLegBlocks(prev => [...prev, newLeg]);
    }

    function handleDeleteLeg(idxToDelete) {
        setTripLegBlocks(prev =>
            prev.filter((_, i) => i!== idxToDelete)
        );
    }


    function handleSubmit(event) {
        event.preventDefault();
        // console.log("Transport type: " + transportType);
        // console.log("Airline: " + airline);
        // console.log("Car Rental: ", carRental);
        // console.log("Train: " + train);
        // console.log(transportMap);

        const errors = {};
        if(!transportType) {
            errors.transportType = "Select a transport type";
        }
        if(transportType === "airline" && !airline) {
            errors.airline = "Select an airline";
        }
        if(transportType === "car_rental" && !carRental) {
            errors.carRental = "Slect a car rental company";
        }
        if(transportType === "train" && !train) {
            errors.train = "Select a train type";
        }
        if(!accommodationType) {
            errors.accommodationType = "Select an accommodation";
        }
        if(accommodationType === "hotel" && !hotel) {
            errors.hotel = "Select hotel brand";
        }

        setFormErrors(errors);

        if(Object.keys(errors).length > 0) {
            return;
        }

        let transportName = "N/A";

        if(transportType === "airline" && airline) {
            const match = transportMap.airline.find(o => o.value === airline);
            transportName = match?.label || "N/A";
        } 
        else if(transportType === "car_rental" && carRental) {
            const match = transportMap.car_rental.find(o => o.value === carRental);
            transportName = match?.label || "N/A";
        }
        else if(transportType === "train" && train) {
            const match = transportMap.train.find(o => o.value === train);
            transportName = match?.label || "N/A";
        }

        let hotelName = "N/A";
        if(accommodationType === "hotel" && hotel) {
            const match = hotelMap.find(o => o.value === hotel);
            hotelName = match?.label || "N/A";
        }

        const newLeg = {
            id: Date.now(),
            startDate,
            startLoc,
            endLoc,
            accommodationType,
            hotelName,
            accommodationStatus,

            transportType,
            transportName,

            comments,
            editing: true
        };
        
        addTripLegBlock(newLeg);

        toast.success("Trip leg saved successfully!");
    }


    function handleSaveTrip() {
        if(tripLegBlocks.length === 0) {
            toast.error("Add at least one trip leg before saving the trip.");
            return;
        }

        const bodyContent = { 
            legs: tripLegBlocks,
            name: tripName
        };

        const method = tripId ? "PUT" : "POST";
        const url = tripId ? `${TRIP_API}/trips/${tripId}` : `${TRIP_API}/trips`;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyContent),
        })
        .then(response => {
            if(!response.ok) {
                toast.error("Internal error with saving trip, please try again")
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(!tripId) {
                setTripId(data.id);
            }
            toast.success(`Trip ${method === "POST" ? "saved" : "updated"} successfully!`);
        })
        .catch(err => {
            console.error(err);
            toast.error("Error saving trip. Try again");
        });
    }

    useEffect(() => {
        fetchTransport().then((results) => {
            const updatedTransportMap = {
                airline: structureAndSort(results.airline),
                car_rental: structureAndSort(results.car_rental),
                train: structureAndSort(results.train),
            };

            setTransportMap(updatedTransportMap);
        });
    }, []);

    useEffect(() => {
        fetchHotels().then((results) => {
            const hotelOptions = structureAndSort(results);
            setHotelMap(hotelOptions);
        })
    }, []);

    const transportOptions = [
        { 
            value: "", 
            label: "N/A"
        },
        { 
            value: "airline", 
            label: "Airline"},
        {
            value: "car_rental",
            label: "Car Rental", 
        },
        {
            value: "train",
            label: "Train"
        }
    ];


    return (
        <div className="container mt-4">
            <div className="mb-3">
                <Link to={`/`}>
                    Home
                </Link>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="h1">Trip Leg Options</h1>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="tripname"
                            label="Trip Name"
                            value={tripName}
                            onChange={(newName) => {
                                setTripName(newName);
                            }}
                        />
                        <TextInput
                            id="startdate"
                            label="Start Date"
                            value={startDate}
                            onChange={(newStartDate) => {
                                setStartDate(newStartDate);
                            }}
                        />

                        <TextInput
                            id="startloc"
                            label="Start Location"
                            value={startLoc}
                            onChange={(newStartLoc) => {
                                setStartLoc(newStartLoc);
                            }}
                        />

                        <TextInput
                            id="endloc"
                            label="End Location"
                            value={endLoc}
                            onChange={(newEndLoc) => {
                                setEndLoc(newEndLoc);
                            }}
                        />

                        <RadioButtons
                            title="Accommodation Type"
                            name="accommodation-type"
                            options={[
                                { value: "airbnb", label: "Airbnb" },
                                { value: "hotel", label: "Hotel" },
                            ]}
                            value={accommodationType}
                            onChange={(value) => 
                                setAccommodationType(value)
                            }
                            isInvalid={!!formErrors.accommodationType}
                            errorMsg={formErrors.accommodationType}
                        />

                        {accommodationType === "hotel" && (
                            <Dropdown
                                id="hotel-selection"
                                label="Select Hotel"
                                value={hotel}
                                onChange={setHotel}
                                choices={hotelMap}
                                isInvalid={!!formErrors.hotel}
                                errorMsg={formErrors.hotel}
                            />
                        )}

                        <CheckBox
                            id="accommodation-status"
                            label="Accommodations already booked?"
                            checked={accommodationStatus}
                            onChange={setAccommodationStatus}
                        />
   
                        <DropdownWithConditional
                            parent={{
                                label: "Transport",
                                value: transportType,
                                choices: transportOptions,
                                onChange: setTransportType,
                                isInvalid: !!formErrors.transportType,
                                errorMsg: formErrors.transportType
                            }}
                            children={{        
                                airline: {
                                    label: "Airline",
                                    value: airline,
                                    choices: transportMap.airline,
                                    onChange: setAirline,
                                    isInvalid: !!formErrors.airline,
                                    errorMsg: formErrors.airline
                                },
                                car_rental: {
                                    label: "Car Rental",
                                    value: carRental,
                                    choices: transportMap.car_rental,
                                    onChange: setCarRental,
                                    isInvalid: !!formErrors.carRental,
                                    errorMsg: formErrors.carRental
                                },
                                train: {
                                    label: "Train",
                                    value: train,
                                    choices: transportMap.train,
                                    onChange: setTrain,
                                    isInvalid: !!formErrors.train,
                                    errorMsg: formErrors.train
                                }
                            }}
                        />
                         <TextArea
                            id="comments"
                            label="Comments"
                            rows="4"
                            value={comments}
                            onChange={(newComments) => {
                                setComments(newComments);
                            }}
                        />

                        <button type="submit" className="btn btn-primary mb-3">
                            Save Trip Leg
                        </button>
                        <button 
                            className="btn btn-secondary mb-3 ms-3"
                            type="button"
                            onClick={() => {
                                setTransportType("");
                                setAirline("");
                                setCarRental("");
                                setTrain("");
                                setStartLoc("");
                                setEndLoc("");
                                setAccommodationType("");
                                setHotel("");
                                setComments("");
                                setAccommodationStatus(false);
                            }}
                        >
                            Reset Choices
                        </button>
                        <button 
                            className="btn btn-success mb-3 ms-3"
                            type="button"
                            onClick={handleSaveTrip}
                        >
                            Save Entire Trip
                        </button>
                    </form>
                </div>
                <div className="col">
                    <h3 className="h3">Current Trip Legs</h3>
                    {tripLegBlocks.length === 0 ? 
                    (
                        <div>Nothing yet</div>
                    ) : 
                    (
                        tripLegBlocks.map((leg, index) => (
                            <TripLegBlock 
                                data={leg} 
                                transportMap={transportMap}
                                hotelMap={hotelMap}
                                onDelete={() =>
                                    handleDeleteLeg(index)
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}