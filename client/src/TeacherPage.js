import React from 'react';
import Eventform from './component/teacher/event';
import EventTeacher from './component/teacher/eventteacher';
import Excel from './component/teacher/exel';
import LogoutButton from './component/logout';
import { Card } from 'react-bootstrap';

function TeacherPage() {

  return (
    <div>
      <div className="d-flex justify-content-end w-100 mb-3">
      <LogoutButton  className="mr-auto" />
      </div>
      <div className="container d-flex flex-column align-items-center justify-content-center">
      <style />
      <h1>Teacher Page</h1>
      <br></br>
      <Card>
        <Card.Body>
        <h2>Create Event</h2>
          <Eventform />
          <Excel />
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card>
        <Card.Body>
          <EventTeacher />
        </Card.Body>
      </Card>
      </div>
    </div>

  );

}

export default TeacherPage;
