import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import { BrowserRouter as Router } from 'react-router-dom';
import Entrypage from './component/entrypage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/student",
    element: <StudentPage/>,
  },
  {
    path: "/teacher",
    element: <TeacherPage/>,
  },
  {
    path: "/Entrypage/:eventId",
    element: <Entrypage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );


reportWebVitals();