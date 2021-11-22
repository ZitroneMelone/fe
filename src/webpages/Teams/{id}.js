import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import teams from "../../teams.json"

const Team = () => {

    let {teamId} = useParams();

    function getTeam() {
        for (let i = 0; i < teams.data.length; i++) {

            if(teams.data[i].team === teamId){
                return <img style={{height: '70vh'}} src={teams.data[i].bild}/>
            }
        }
        return <p>Not found</p>

    }

    return (
        <div>
            {getTeam()}
        </div>
    );
};

export default Team;