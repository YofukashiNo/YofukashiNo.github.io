import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import LanyardProfile from "src/LanyardProfile";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <LanyardProfile />
  </React.StrictMode>,
);
