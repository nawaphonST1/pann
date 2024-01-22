import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Eventform from './component/event';
import axios from 'axios';

function TeacherPage() {
  return (
    <div class="container">
      Teacher Page
      <h1>Announcement of event</h1>
      <Eventform />
    </div>
    
  );

}

// const TeacherPage = () => {
//   return (
//     <div>
//       <h1>Activity Tracker</h1>
//       <Eventform />
//     </div>
//   );
// };

export default TeacherPage;
