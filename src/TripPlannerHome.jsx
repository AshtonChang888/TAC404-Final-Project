import "bootstrap/dist/css/bootstrap.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp, faArrowDown, faMinus, faPlus, faHeart, faThumbsUp, faThumbsDown, faAngry } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';


export default function TripPlannerHome(props) {
    const trips = useLoaderData();
    console.log(trips);

    return (
        <div className="container">
            <h1>My Trips</h1>
            <Navbar>
                <Container className="justify-content-between">
                    <Link to={`/new-trip`}>
                        <button type="button">
                            New Trip
                        </button>
                    </Link>
                </Container>
            </Navbar>
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

