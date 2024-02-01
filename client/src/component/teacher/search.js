// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import axiosConfig from '../../axios-interceptor.js';
// import Entrypage from './entrypage.js';
// import { useNavigate } from 'react-router-dom';


// const TeacherSearch = () => {
//   const [Event, setEvents] = useState([]);
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');



//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const userId = axiosConfig;
//         const response = await axios.get('http://localhost:1337/api/events', {
//           headers: {
//             'Authorization': `Bearer ${axiosConfig.jwt}`,
//           }
//         });
  
//         const filteredEvents = response.data.data.filter(event =>
//           event.attributes.Eventname.toLowerCase().includes(searchTerm.toLowerCase())
//         );
  
//         setEvents(filteredEvents);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
  
//     fetchEvents();
//   }, [searchTerm]);
  
//   return (
//       <div>
//         <label htmlFor="search">Search Event: </label>
//         <input
//           type="text"
//           id="search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={() => fetchEvents()} className="btn btn-outline-success">
//           Search
//         </button>
//       </div>
//   );
// };

// export default TeacherSearch;
