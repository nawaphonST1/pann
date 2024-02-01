import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../axios-interceptor';
import './eventstudent.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EventStudent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/users/me?populate=entries.event', {
          headers: {
            'Authorization': `Bearer ${axiosConfig.jwt}`,
          }
        });
        console.log(response.data);
        setEvents(response.data.entries || []); // Set to an empty array if response.data.entries is undefined
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th> </th>
            <th>Event Name</th>
            <th>Effective Datetime</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(events) && events.map(entry => (
            <tr key={entry.id}>
              <td>
                <button type="submit" className="btn btn-outline-success">
                  <Link to={`/Entrystudent/${entry.event.id}`} onClick={() => navigate(`/Entrystudent/${entry.event.id}`)}>
                    Result
                  </Link>
                </button>
              </td>
              <td>{entry.event.Eventname}</td>
              <td>{entry.event.effective_datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventStudent;
