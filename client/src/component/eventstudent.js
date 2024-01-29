import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../axios-interceptor';
import './eventstudent.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EventStudent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Assuming axiosConfig includes the username of the logged-in user
        const username = axiosConfig.username;

        const response = await axios.get(`http://localhost:1337/api/entries?populate=*&owner.username=${username}`, {
          headers: {
            'Authorization': `Bearer ${axiosConfig.jwt}`,
          }
        });

        // Filter events based on the ownership of the entry
        const filteredEvents = response.data.data.map(entry => entry.attributes.event.data.attributes);

        setEvents(filteredEvents);
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
          {events.map((Event) => (
            <tr key={Event.id}>
               <button type="submit" class="btn btn-outline-success" >
                <Link to={`/Entrypage/${Event.id}`} onClick={() => navigate(`/Entrypage/${Event.id}`)}>
                  Result
                </Link>
              </button>
              <td>{Event.Eventname}</td>
              <td>{Event.effective_datetime}</td>
              {/* Add more cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventStudent;
