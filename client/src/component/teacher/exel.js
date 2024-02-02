import axios from "axios";
import * as XLSX from 'xlsx';
import { Card, Form, Table } from "react-bootstrap";
import React, { useState } from 'react';

const Excel = () => {
    const [excelData, setExcelData] = useState([]);
    const [eventname, setEventname] = useState('');
    const [effective_datetime, setEffectiveDatetime] = useState('');

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                console.log('Excel Data:', parsedData);
                setExcelData(parsedData);
            } catch (error) {
                console.error('Error reading Excel file:', error);
            }
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    const addEventToExcel = async () => {
        // Check if there is data in excelData
        if (excelData.length < 2) {
            console.error('No data in Excel file to add events.');
            return;
        }
    
        const isoDateTime = new Date(effective_datetime).toISOString();
    
        // Create a new event object based on the provided structure
        const newEvent = {
            Eventname: eventname,
            effective_datetime: isoDateTime,
            owner: {
                // You need to specify the owner data based on your Strapi schema
                // For example, if the owner is a user, you might need to associate the user ID
            },
            entries: {
                data: excelData.slice(1).map((entry, index) => ({
                    result: entry[1],
                    status: entry[2],
                    // Assuming each entry in the Excel file corresponds to a different event
                    // You may want to modify this based on your specific use case
                    id: index + 1,
                })),
            },
        };
    
        try {
            // Make a POST request to your Strapi endpoint
            const response = await axios.post('http://localhost:1337/api/events', {
                data: newEvent,
            });
            console.log('New Event:', newEvent);
            console.log('Response from Strapi:', response);
            console.log('Events added to Strapi:', response.data);
            // You can add additional logic here if needed
        } catch (error) {
            console.error('Error adding events to Strapi:', error);
        };
    };
    

    return (
        <div>
            <br />
            <Card style={{ width: '400px' }}>
                <Card.Body>
                    <Form>
                        <br />
                        <Form.Group controlId="formFile">
                            <Form.Label>Upload</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <br />
                        <label>
                            Name of event:
                            <Form.Control
                                type="text"
                                value={eventname}
                                onChange={(e) => setEventname(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Date-Time:
                            <Form.Control
                                type="datetime-local"
                                value={effective_datetime}
                                onChange={(e) => setEffectiveDatetime(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="button" className="btn btn-outline-success" onClick={addEventToExcel}>
                            Add Event
                        </button>
                    </Form>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
};

export default Excel;
