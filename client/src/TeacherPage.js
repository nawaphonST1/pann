import React from 'react';
import Eventform from './component/teacher/event';
import EventTeacher from './component/teacher/eventteacher';

function TeacherPage() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <style />
      Teacher Page
      <h1>Announcement of event</h1>
      <Eventform />
      <EventTeacher />
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
