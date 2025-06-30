import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
function Index()
{
  return (<>
  <BrowserRouter>
  <App></App>
  </BrowserRouter>
  </>);
}
let root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index></Index>);