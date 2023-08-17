import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [contact,setContact] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user) {
      setName(user.name);
    }
  }, [user]);
  
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  
  async function bookiThisPlace() {
    const response = await axios.post('/bookings', {
      place,checkIn,checkOut,numberOfGuests,name,contact,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if( redirect ) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: Rs {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex grid grid-cols-2">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input type="date"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)} />
          </div>
        </div>
        <div className="px-4 py-2 border-t">
          <label>Number of Guests</label>
          <input type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="px-4 py-2 border-t">
            <label>Your Full Name:</label>
            <input type="text" placeholder="John Doe"
              value={name}
              onChange={ev => setName(ev.target.value)} />
              <label>Contact no:</label>
            <input type="tel"
              value={contact}
              onChange={ev => setContact(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={bookiThisPlace} className="primary mt-2">
        Book this place
        {numberOfNights > 0 && (
          <span> @ Rs {numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}