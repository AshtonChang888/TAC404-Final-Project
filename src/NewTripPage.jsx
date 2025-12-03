import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import "bootstrap/dist/css/bootstrap.css";


function fetchAirlines(search) {
  return fetch(`http://localhost:3000/airlines`)
    .then(response => response.json());
}

export default function NewTripPage() {    
    function handleSubmit(event) {
        event.preventDefault();
    }

    const [airline, setAirline] = useState("");
    const [airlineChoices, setAirlineChoices] = useState([]);

    useEffect(() => {
    fetchAirlines().then((results) => {
        const formatted = results.map(a => ({ value: a.name, label: a.name }));
        setAirlineChoices([
        { value: "", label: "N/A" },
        ...formatted
        ]);
    });
    }, []);


    return (
        <form onSubmit={handleSubmit}>
            <Dropdown
                label="Size"
                value={airline}
                choices={airlineChoices}
                onChange={(updatedAirline) => {
                    setAirline(updatedAirline);
                }}
            />
            <button type="submit" className="btn btn-primary mb-3">
                Submit
            </button>
        </form>
    )
}