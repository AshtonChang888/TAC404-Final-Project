import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as filledBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as openBookmark } from "@fortawesome/free-regular-svg-icons";

const TRIP_API = `http://localhost:3000`;


export default function TripPlannerHome() {
    useEffect(() => {
        document.title = "Home Page";  
    }, []);

    const tripsData = useLoaderData();
    const [trips, setTrips] = useState(tripsData); // || []
    const [bookmarked, setBookmarked] = useState([]);

    const toggleBookmark = (trip) => {
        const updatedTrip = { ...trip };
        const alreadyBookmarked = bookmarked.find(b => b.id === trip.id);

        if(alreadyBookmarked) {
            setBookmarked(prev => prev.filter(b => b.id !== trip.id));
            updatedTrip.bookmarkedAt = null;
        } 
        else {
            updatedTrip.bookmarkedAt = new Date().toISOString();
            setBookmarked(prev => [updatedTrip, ...prev]);
        }

        setTrips(prev => prev.map(t => 
            t.id === trip.id ? updatedTrip : t
        ));

        fetch(`${TRIP_API}/trips/${trip.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTrip)
        })
        .catch(err => 
            console.error(err)
        );
    };

    function deleteTrip(tripId) {
        fetch(`${TRIP_API}/trips/${tripId}`, {
            method: 'DELETE' 
        })
        .then(() => {
            setTrips(prev => prev.filter(t => 
                t.id !== tripId
            ));
            setBookmarked(prev => prev.filter(b => 
                b.id !== tripId
            ));
            toast.success("Trip deleted successfully!");
        })
        .catch(err => {
            console.error(err);
            toast.error("Error deleting trip");
        });
    }

    const displayTrips = [
        ...bookmarked,
        ...trips.filter(t => 
                !bookmarked.find(b => b.id === t.id)
            ) //Remove bookmarked from regular list
    ];

    return (
        <div className="container mt-4">
            <h1 className="mb-3">My Trips 🧳✈️</h1>

            <Navbar className="mb-4">
                <Container className="justify-content-between">
                    <Link to={`/new-trip`}>
                        <button type="button" className="btn btn-primary">New Trip</button>
                    </Link>
                </Container>
            </Navbar>

            <div className="row">
                {displayTrips.length === 0 ? (
                    <p>No trips yet</p>
                ) : (
                    displayTrips.map((trip) => (
                        <div key={trip.id} className="col-12 col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 className="card-title">
                                            {trip.name}
                                        </h4>
                                        <p className="mb-0">
                                            Legs: {trip.legs?.length || 0}
                                        </p>
                                        {trip.bookmarkedAt && (
                                            <p className="text-muted mb-1">
                                                Bookmarked on: {new Date(trip.bookmarkedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/trips/${trip.id}`}>
                                            <button className="btn btn-secondary btn-sm">
                                                Show Trip
                                            </button>
                                        </Link>
                                        <div>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => 
                                                    toggleBookmark(trip)
                                                }
                                            >
                                                <FontAwesomeIcon 
                                                    icon={trip.bookmarkedAt ? filledBookmark : openBookmark}
                                                />
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteTrip(trip.id)}
                                            >
                                                −
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}