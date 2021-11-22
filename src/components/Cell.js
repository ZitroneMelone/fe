import React from 'react';
import styles from '../components style/CellStyle.css'

const Cell = (props) => {

    function handleClass (props){
        if(props.props.clicked){
            if(props.props.color){
                return "CellDarkClicked"
            }
            return "CellWhiteClicked"

        } else{
            if(props.props.color){
                return "CellDark"
            }
            return "CellWhite"
        }
    }

    return (
        <button className={handleClass(props)} onClick={props.onClick}>
            <div className={props.props.team?"TeamDark":"TeamWhite"} > {props.props.name}</div>
        </button>
    );
};

/*
HANDCLICK GEHT NUR WENN TURN AKTIV IST
WENN HANDLE CLICK AUSGEFÜHRT WURDE WIRD TURN BEIM EIGENEN TEAM AUF FALSE GESETZT UND BEIM GEGNERISCHEN AUF TRUE
BAUE EINE FUNKTION DIE CHECKT WELCHE FELDER AUF DEM SPIELFELD VON DER GEPICKED FIGUR ERREICHT WERDEN KÖNNEN (RETURN EIN
2D ARRAY JEDES FELD HAT DEN PROP REACHABLE 0 TRUE FÜR ERREICHBAR FALSE FÜR NICHT)
WENN DAS GEKLICKTE FELD IN DIESEM BEREICH LIEGT; DANN KANN DER ZUG DURCHGEFÜHRT WERDEN
 */

export default Cell;