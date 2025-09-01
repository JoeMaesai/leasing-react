import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

const router = createBrowserRouter([
  {  
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },                  // "/"
      {
        element: <ProtectedRoute />,                        // guards children
        children: [{ path: "main", element: <Main /> }],    // "/main"
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
