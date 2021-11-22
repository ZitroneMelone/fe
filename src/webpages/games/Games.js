import React from 'react';
import {Link} from "react-router-dom";

const Games = () => {
    return (
        <div>
            <Link to="chess"><img src={"https://static.betzold.de/images/prod/44489/Betzold-Schach-Klappkoffer-44489_a-XL.jpg"}></img>  </Link>
        </div>
    );
};

export default Games;