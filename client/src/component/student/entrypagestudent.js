import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../axios-interceptor';

const DisplayMatchingEntry = () => {
  const [userDetails, setUserDetails] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/users/me?populate=entries.event&events?filters[id][$eq]=1', {
          headers: {
            'Authorization': `Bearer ${axiosConfig.jwt}`,
          }
        });

        console.log(response.data);
        setUserDetails(response.data || {});
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleEventClick = (event) => {
    // Set the selected event when clicked
    setSelectedEvent(event);
  };

  return (
    <div>
      <h1>Your Results</h1>
      {userDetails.entries && userDetails.entries.map(entry => (
        <div key={entry.id}>
          <p>Result: {entry.result}</p>
          <p>Event Name: {entry.event.Eventname}</p>
        </div>
      ))}

      <h2>Click on an event to display associated entry:</h2>
      {userDetails.entries && userDetails.entries.map(entry => (
        <div key={entry.event.id} onClick={() => handleEventClick(entry.event)}>
          <p>Event Name: {entry.event.Eventname}</p>
        </div>
      ))}

      {/* Display selected event's entry */}
      {selectedEvent && userDetails.entries && (
        <div>
          <h3>Selected Event: {selectedEvent.Eventname}</h3>
          <ul>
            {userDetails.entries
              .filter(entry => entry.event.id === selectedEvent.id && entry.owner === userDetails.id)
              .map(entry => (
                <li key={entry.id}>
                  Result: {entry.result}, Created At: {entry.createdAt}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisplayMatchingEntry;
