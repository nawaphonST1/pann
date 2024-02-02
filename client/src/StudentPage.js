import EventStudent from './component/student/eventstudent';
import { Card } from 'react-bootstrap';
import LogoutButton from './component/logout';

function StudentPage() {
  return (
    <div>
      <div className="d-flex justify-content-end w-100 mb-3">
      <LogoutButton/>
      </div>
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h1>Student Page</h1>
      <br></br>
      <Card>
        <Card.Body>
          <h2>Announcement of Event</h2>
          <EventStudent />
        </Card.Body>
      </Card>
    </div>
    </div>

  );
}

export default StudentPage;
