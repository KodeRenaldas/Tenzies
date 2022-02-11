import React, {useState, useEffect} from "react";
import "./style.css"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    //States
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    useEffect(() => {
        //Checks if every die is held(returns true or false)
        const allDiceHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allDiceHeld && allSameValue) {
            setTenzies(true)
        }
    },[dice])
    //generates a single new dice
    function generateNewDie() {
        return {value: Math.ceil(Math.random()*6),isHeld: false,id: nanoid()}
    }
    //generates 10 die
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    //holds die onclick
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }
    //generates new die only if {isHeld} is false
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    //maps through every die that is generated during useState
    const diceElement = dice.map(die => <Die key={die.id}value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)
    return (
        <main>
            {tenzies && <Confetti/>}
            <div className="header">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice_container">
                {diceElement}
            </div>
            <button onClick={rollDice} className="roll_dice">{tenzies?"New game":"Roll"}</button>
        </main>
    )
}