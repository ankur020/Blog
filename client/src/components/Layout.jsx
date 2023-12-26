import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toast";

function Layout({ children }) {
  return (
    <div>
      <main>
        <Header />
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}

export default Layout;
