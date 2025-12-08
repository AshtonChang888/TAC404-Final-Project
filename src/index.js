import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TripPlannerHome from './TripPlannerHome';
import FutureTripPage from './FutureTripPage';
import NewTripPage from './NewTripPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

const TRIP_API = `http://localhost:3000`;


const router = createBrowserRouter([
  // {
  //   path: '/login',
  //   element: <LoginPage/>,
  // },
  {
    path: '/',
    element: <TripPlannerHome/>,
    loader() {
      // localStorage.setItem("userId", "0");
      // const userId = localStorage.getItem("userId");

      return fetch(
        `${TRIP_API}/trips`
      ).then((response) => {
        return response.json();
      });
    }
  },
  // {
  //   path: '/past/:tripname',
  //   element: <PastTrip/>,
  //   loader(routeInfo) {
  //     const tripname = routeInfo.params.tripname;
  //     return fetch(
  //       `${TRIP_API}/${tripname}`
  //     ).then((response) => {
  //       return response.json();
  //     });
  //   }
  // },
  {
    path: '/trips/:tripid',
    element: <FutureTripPage/>,
    loader(routeInfo) {
      const tripid = routeInfo.params.tripid;

      const userId = localStorage.getItem("userId");

      return fetch(`${TRIP_API}/trips/${tripid}`)
      .then((response) => {
        console.log(response);
        return response.json();
      });
    }
  },
  {
    path: '/new-trip',
    element: <NewTripPage/>
  }
  // {
  //   path: '/future/:tripname/edit',
  //   element: <TripEdit/>,
  //   loader(routeInfo) {
  //     const tripname = routeInfo.params.tripname;
  //     return fetch(
  //       `${TRIP_API}/${tripname}`
  //     ).then((response) => {
  //       return response.json();
  //     });
  //   }
  // }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
