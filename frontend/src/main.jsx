import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error from "./components/shared/Error";
import App from "./App";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
