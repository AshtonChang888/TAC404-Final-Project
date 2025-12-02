import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp, faArrowDown, faMinus, faPlus, faHeart, faThumbsUp, faThumbsDown, faAngry } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


export default function TripPlannerHome(props) {
    const trips = useLoaderData();
    console.log(trips);

    return (
        <div className="container">
            <h1>My Trips</h1>
            {trips.map((singleTrip) => {
                return (
                    <Link to={`/future/${singleTrip.name}`}>
                        <button type="button">
                            {singleTrip.name}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}

