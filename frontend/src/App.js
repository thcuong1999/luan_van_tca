import React from "react";
import "react-toastify/dist/ReactToastify.css";
import RouteProvider from "./navigation/RouteProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouteProvider />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
