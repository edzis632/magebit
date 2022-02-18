import React from "react";
import ReactDOM from "react-dom";

import Subscribe from "./Pages/subscribe.js";
import Table from "./Pages/table.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './style.scss';
import './fonts/fonts.scss';

function App() {

    return (

        <Router>
          <Routes>
            <Route path="/" element={<Subscribe />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
