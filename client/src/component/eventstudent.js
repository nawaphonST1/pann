import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-interceptor';

const EventStudent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = axiosConfig;
        console.log('Request Payload:', {
            owner: userId,
          });
        // Replace 'YOUR_STRAPI_URL' with the actual URL of your Strapi API
        const apiUrl = 'http://localhost:1337/api/events';
        const response = await axios.get(apiUrl);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event Page</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Effective Datetime</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.EventName}</td>
              <td>{event.EffectiveDatetime}</td>
              {/* Add more cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventStudent;
