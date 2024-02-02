import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../axios-interceptor.js';
import { Card } from 'react-bootstrap';

const Entrypage = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch event details
                const response = await axios.get(`http://localhost:1337/api/events/${eventId}?populate=entries.owner`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                setEventDetails(response.data);
                setEntries(response.data.data.attributes.entries.data); // Extract entries

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
        <br></br>
        <br></br>
        <br></br>
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <Card>
            <Card.Body>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {eventDetails && (
                <div>
                    {/* Display entries */}
                    <h2>Entries:</h2>
                    <ul>
                        {Array.isArray(entries) && entries.map((entry) => (
                            <li key={entry.id}>
                                {entry.attributes && entry.attributes.owner && (
                                    <div>
                                        <p>Username: {entry.attributes.owner.data.attributes.username}</p>
                                        {/* Add more owner details as needed */}
                                    </div>
                                )}
                                <p>Result: {entry.attributes && entry.attributes.result}</p>
                                <p>Status: {entry.attributes && entry.attributes.status}</p>
                                <br></br>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </Card.Body>
            </Card>
        </div>
        </div>
    );
};

export default Entrypage;
