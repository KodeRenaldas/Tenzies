import React from "react";

export default function Die(props) {
    return (
        //changes background color using state isHeld
        <div className="die" style={{backgroundColor:props.isHeld?"#59e391":"white"}} onClick={props.holdDice}>
            <h2 className="die_num">{props.value}</h2>
        </div>
    )
}