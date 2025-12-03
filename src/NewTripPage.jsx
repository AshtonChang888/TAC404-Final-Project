import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import TripBlock from "./TripBlock";

import "bootstrap/dist/css/bootstrap.css";


function fetchAirlines() {
  return fetch(`http://localhost:3000/airlines`)
    .then(response => response.json());
}


export default function NewTripPage() {    
    const [tripBlocks, setTripBlocks] = useState([]);
    const [airline, setAirline] = useState("");
    const [airlineChoices, setAirlineChoices] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        
    }

    useEffect(() => {
        fetchAirlines().then((results) => {
            const otherChoices = results.map(obj => ({ value: obj.id, label: obj.name }));
            
            setAirlineChoices([
                { value: "", label: "N/A" },
                ...otherChoices
            ]);
        });
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col">
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
                            Save
                        </button>
                        <button 
                            className="btn btn-secondary mb-3 me-3"
                            type="button"
                            onClick={() => {
                                setAirline("");
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