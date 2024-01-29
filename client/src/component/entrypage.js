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

                const username = axiosConfig.username;

                const entriesResponse = await axios.get(`http://localhost:1337/api/entries?_where[0][event.id_eq]=${eventId}&_where[1][owner.username_eq]=${username}`, {
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
                </div>
            )}
            <h2>Entries:</h2>
            <ul>
                {Array.isArray(entries) && entries.map((entry) => (
                    <li key={entry.id}>
                        <p>{entry.attributes && entry.attributes.Entryname}
                        <br></br>Result: {entry.attributes && entry.attributes.Result}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Entrypage;
