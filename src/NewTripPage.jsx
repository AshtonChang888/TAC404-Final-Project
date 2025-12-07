import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import TripLegBlock from "./TripLegBlock";
import RadioButtons from "./RadioButtons";
import DropdownWithConditional from "./DropdownWithConditional";
import CheckBox from "./CheckBox";
import { toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";

function fetchTransport() {
    return fetch(`http://localhost:3000/transport`)
        .then(response => response.json());
}

function fetchHotels() {
    return fetch(`http://localhost:3000/hotels`)
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
    const [tripBlocks, setTripBlocks] = useState([]);

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
        if(transportType === "plane" && !airline) {
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

        toast.success("Trip leg saved successfully!");
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
            value: "plane", 
            label: "Plane"},
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
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="h1">Trip Leg Options</h1>
                    <form onSubmit={handleSubmit}>
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
                                plane: {
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
                            Save
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
                            Reset
                        </button>
                    </form>
                </div>
                <div className="col">
                    {tripBlocks.length === 0 && (
                        <div>
                            Nothing yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}