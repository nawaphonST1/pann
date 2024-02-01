import React, { useState } from 'react';
import axios from 'axios';
import axiosConfig from '../../axios-interceptor';
import Form from 'react-bootstrap/Form';


const Eventform = () => {
    const [Eventname, setEventname] = useState('');
    const [effective_datetime, seteffective_datetime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = axiosConfig;
            const isoDateTime = new Date(effective_datetime).toISOString();
            console.log('Request Payload:', {
                Eventname,
                effective_datetime: isoDateTime,
                owner: userId,
              });
            const response = await axios.post('http://localhost:1337/api/events', {
                "data": {
                  "Eventname": Eventname,
                  "effective_datetime":  effective_datetime
                }
              },
            {
                headers: {
                    'Authorization': `Bearer ${axiosConfig.jwt}`,
                }
            });

            console.log('Activity added:', response.data);
            // You can add additional logic here, like resetting the form or updating state.
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name of event:
                <Form.Control
                    type="int"
                    value={Eventname}
                    onChange={(e) => setEventname(e.target.value)}
                />
            </label>
            <br />
            <label>
                Date-Time:
                <Form.Control
                    type="datetime-local"
                    value={effective_datetime}
                    onChange={(e) => seteffective_datetime(e.target.value)}
                />
            </label>
            <br />
            <br />
            <button type="submit" class="btn btn-outline-success">Add Event</button>
        </form>
    );
};

export default Eventform;

