import { Link, useLoaderData } from "react-router-dom";
import TripLegBlock from "./TripLegBlock";
import { useEffect } from "react";

export default function FutureTripPage() {
    const trips = useLoaderData();
    const trip = Array.isArray(trips) ? trips[0] : trips;

    useEffect(() => {
        document.title = trip.name;  
    }, [trip]);

    return (
        <div className="container mt-4">
            
            <Link to="/">
                Back to Home
            </Link>
            <div className="mb-4 p-3">
                <h1 className="display-5">{trip.name || "Untitled Trip"}</h1>
            </div>
            <div className="row">
                {trip.legs && trip.legs.length > 0 ? (
                    trip.legs.map((leg) => (
                        <div key={leg.id} className="col-12 col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <TripLegBlock
                                        data={{ ...leg, editing: false }}
                                        hotelMap={{}}
                                        onDelete={null} // disable delete for saved trips
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No trip legs yet</p>
                )}
            </div>
        </div>
    );
}