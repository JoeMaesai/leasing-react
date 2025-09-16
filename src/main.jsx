import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider,Navigate  } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import Main from "./pages/Main";
import A01CreatePackage from "./pages/A01CreatePackage";
import A02CreateCustomer from "./pages/A02CreateCustomer";
import A03ReceivePayment from "./pages/A03ReceivePayment";

const router = createBrowserRouter([
  {  
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },                  // "/"
      {
        element: <ProtectedRoute />,                        // guards children
        children: [
          { path: "main", 
            element: <Main />,
            children: [
              { index: true, element: <A01CreatePackage /> },      // "/main"
              { path: "createpackage", element: <A01CreatePackage /> },// "/main/dashboard"
              { path: "createcustomer", element: <A02CreateCustomer /> },    // "/main/profile"
              { path: "receivepayment", element: <A03ReceivePayment /> },  // "/main/settings"
              { path: "*", element: <Navigate to="." replace /> },
            ]
          }],    // "/main"
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
