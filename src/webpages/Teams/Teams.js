import React from 'react';
import {Link, Outlet} from "react-router-dom";
import teams from "../../teams.json"

const Teams = () => {
    return (
        <div>
            {teams.data.map(function (ele) {
                return <div><Link to={ele.team}>{ele.team}</Link></div>
            })}
            <Outlet/>
        </div>
    );
};

export default Teams;