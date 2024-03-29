import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosConfig from '../../axios-interceptor.js';
import Entrypage from './entrypage.js';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';


const EventTeacher = () => {
  const [Event, setEvents] = useState([]);
  const [editedName, setEditedName] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');



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

      const filteredEvents = response.data.data.filter(event =>
        event.attributes.Eventname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log(response.data.data);
      setEvents(filteredEvents);
      console.log(Event);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Fetch events on component mount
    fetchEvents();
  }, [searchTerm]);

  const handleDelete = async (eventId) => {
    try {
      // Replace 'YOUR_STRAPI_URL' with the actual URL of your Strapi API
      await axios.delete(`http://localhost:1337/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      // Update state after successful deletion
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditName = async (eventId, newName) => {
    try {
      await axios.put(`http://localhost:1337/api/events/${eventId}`, {
        data: {
          Eventname: newName,
        },
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, attributes: { ...event.attributes, Eventname: newName } } : event
        )
      );

      setEditingEventId(null);
      setEditedName('');
    } catch (error) {
      console.error('Error editing name:', error);
    }
  };

  return (
    <div>
      <h1>Event</h1>
      <Card>
        <Card.Body>
          <label>
            <label htmlFor="search">Search Event: </label>
            <Form.Control class="form-control"
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <table border="1">
            <thead>
              <tr>
                <th> </th>
                <th>Event Name</th>
                <th>Effective Datetime</th>
              </tr>
            </thead>
            <tbody>
              {Event.map((Event) => (
                <tr key={Event.id}>
                  <button type="submit" class="btn btn-outline-success" >
                    <Link to={`/Entrypage/${Event.id}`} onClick={() => navigate(`/Entrypage/${Event.id}`)}>
                      Result
                    </Link>
                  </button>
                  <td>{Event.attributes && Event.attributes.Eventname}</td>
                  <td>{Event.attributes && Event.attributes.effective_datetime}</td>
                  <td>
                    <button onClick={() => handleDelete(Event.id)} type="submit" class="btn btn-outline-success" >Delete</button>
                  </td>
                  <td>
                    {editingEventId === Event.id ? (
                      <>
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                        <button onClick={() => handleEditName(Event.id, editedName)} >Save</button>
                      </>
                    ) : (
                      <button onClick={() => setEditingEventId(Event.id)} type="submit" class="btn btn-outline-success" >Edit</button>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventTeacher;
