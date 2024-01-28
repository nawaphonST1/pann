import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-interceptor';


const EventTeacher = () => {
  const [Event, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = axiosConfig;
        console.log('Request Payload:', {
            owner: userId,
          });

        const response = await axios.get('http://localhost:1337/api/events', {
          headers: {
              'Authorization': `Bearer ${axiosConfig.jwt}`,
          }
      });
        console.log(response.data.data)
        setEvents(response.data.data);
        console.log(Event)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      // Replace 'YOUR_STRAPI_URL' with the actual URL of your Strapi API
      await axios.delete(`http://localhost:1337/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${axiosConfig.jwt}`,
        },
      });

      // Update state after successful deletion
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

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
          {Event.map((Event) => (
            <tr key={Event.id}>
              <td>{Event.attributes && Event.attributes.Eventname}</td>
              <td>{Event.attributes && Event.attributes.effective_datetime}</td>
              <td>
                <button onClick={() => handleDelete(Event.id)} type="submit" class="btn btn-outline-success">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTeacher;
