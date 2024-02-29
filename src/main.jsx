import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Questions from './components/Questions';
import QuestionDetails from './pages/QuestionDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/problems",
    element: <Questions />
  },
  {
    path: "/problem/:id",
    element: <QuestionDetails />
  }
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
