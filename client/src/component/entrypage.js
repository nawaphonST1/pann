import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosConfig from '../axios-interceptor';

const Entrypage = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventResponse = await axios.get(`http://localhost:1337/api/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${axiosConfig.jwt}`,
                    },
                });

                setEventDetails(eventResponse.data);

                const entriesResponse = await axios.get(`http://localhost:1337/api/entries?event=${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${axiosConfig.jwt}`,
                    },
                });

                console.log('Entries Response:', entriesResponse.data);
                setEntries(entriesResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {eventDetails && (
                <div>
                    <h1>{eventDetails.attributes && eventDetails.attributes.Eventname}</h1>
                    <p>Effective Datetime: {eventDetails.attributes && eventDetails.attributes.effective_datetime}</p>
                    {/* Add more details as needed */}
                </div>
            )}
            <h2>Entries:</h2>
            <ul>
                {Array.isArray(entries) && entries.map((entry) => (
                    <li key={entry.id}>
                        <h3>{entry.attributes && entry.attributes.Entryname}</h3>
                        <p>Result: {entry.attributes && entry.attributes.Result}</p>
                        {/* Add more entry details as needed */}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Entrypage;
