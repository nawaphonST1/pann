// Entrypage.js

import React from 'react';
import { useParams } from 'react-router-dom';


const Entrypage = () => {
    const { eventId } = useParams();
  
    return (
      <div>
        <h1>Entry Page for Event {eventId}</h1>
        {/* Add your entry page content here */}
      </div>
    );
  };
  
export default Entrypage;
