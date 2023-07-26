import React from "react";
import { Link } from "react-router-dom";

import "../styles/noPageFound.scss";

const NoPageFound = () => {
    return(<>
        <div className="error-page-wrapper">
            <h1>404</h1>
            <h3>Oops, this page could not be found</h3>
            <h5>Sorry, but the page you are looking for 
                does not exist, has been removed, had a 
                name change, or is temporary unavailable</h5>
            <Link to="/"><button>Homepage</button></Link>
        </div>
    </>);
}

export default NoPageFound;