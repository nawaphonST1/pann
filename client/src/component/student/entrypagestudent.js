import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../axios-interceptor';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const Entrystudent = () => {
  const [entryDetails, setEntryDetails] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/events/studentRelated', {
          headers: {
            'Authorization': `Bearer ${axiosConfig.jwt}`,
          }
        });

        console.log(response.data.data);
        setEntryDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching entry details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const acknowledge = async (id) => {
    try {
        const response = await axios.post(`http://localhost:1337/api/entries/${id}/ack_datetime`);
        window.location.reload();
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

  return (
    <div>
      <Card>
        <Card.Body>
      {entryDetails && entryDetails.map((event) => {
        if (event.id.toString() === eventId) {
          return (
            <div key={event.id}>
              <h2>Entry Details for Event ID {event.id}</h2>
              <p>Event Name: {event.attributes.Eventname}</p>
              <p>Effective Datetime: {event.attributes.effective_datetime}</p>
              <p>Result: {event.attributes.entry.result}</p>
              <p>status: {event.attributes.entry.status}</p>
              <p>Confirm: {event.attributes.entry.ack_datetime}</p>
              {/* Add other entry details as needed */}
            </div>
          );
        } else {
          return null;
        }
      })}
      <Button className="acknowledge-button btn btn-success" onClick={() => acknowledge(entryDetails.id)}>Confirm</Button>
      </Card.Body>
      </Card>
    </div>
  );
};

export default Entrystudent;
