import { useState } from "react";
import { FaBackspace, FaDivide } from "react-icons/fa";

import './style.css';
import { Statusbar } from "../Statusbar";

const Calculator = () => {
    const [currValue, setCurrValue] = useState("0");
    const [prevValue, setPrevValue] = useState("0");
    const [overwite, setOverwrite] = useState(true);
    const [operator, setOperator] = useState("");
    const [totalOperation, setTotalOperation] = useState([""]);

    if (currValue === "") setCurrValue("0");

    function clearInput() {
        setCurrValue("0");
        setPrevValue("0");
        setTotalOperation([""]);
        setOperator("");
        setOverwrite(true);
    }

    function del() {
        if (currValue === "0") return;
        setCurrValue(currValue.slice(0, -1));
    }

    function percentage() {
        setCurrValue((Number(currValue) / 100).toString());
    }

    function inputHandle(e: React.MouseEvent<HTMLButtonElement>) {
        const { value } = e.target as HTMLInputElement;

        if (currValue[0] === "0" && value === "0" && !currValue.includes(".")) return;

        if (totalOperation[1] === "0" && value === "0" && !currValue.includes(".")) return;

        if (currValue.includes(".") && value === ".") return;
        console.log(totalOperation);

        if (overwite && value !== ".") {
            setCurrValue(value);
        } else {
            setCurrValue(currValue + value)
            // setTotalOperation([...totalOperation, value])
        }
        setTotalOperation([...totalOperation, value]);
        setOverwrite(false);
    }

    function operatorHandle(e: React.MouseEvent<HTMLButtonElement>) {
        const { value } = e.target as HTMLInputElement;
        if (prevValue) {
            const value = calculate();
            setCurrValue(`${value}`);
            setPrevValue(`${value}`);
        } else {
            setPrevValue(currValue);
        }

        setOperator(value);
        setTotalOperation([...totalOperation, value]);
        setCurrValue("0");
        setOverwrite(true);
    }

    function calculate() {

        if (!currValue || !operator) return currValue;

        const value1 = Number(prevValue);
        const value2 = Number(currValue);
        let result;

        switch (operator) {
            case "/": result = value1 / value2; break;
            case "*": result = value1 * value2; break;
            case "+": result = value1 + value2; break;
            case "-": result = value1 - value2; break;
            default: break;
        }
        return result;

    }
    function equals() {
        const value = calculate();
        setCurrValue(`${value}`);
        setPrevValue("0");
        setOperator("");
        setOverwrite(true);
    }

    return (
        <div className="container">
            <Statusbar />

            <div className="board-input">{currValue}</div>
            {/* <div className="total-operation">{totalOperation}</div> */}

            <div className="keyboard">
                <button className="button function"
                    onClick={clearInput} autoFocus >AC</button>
                <button className="button function" onClick={del}><FaBackspace /></button>
                <button className="button function"
                    onClick={percentage}>%</button>
                <button className="button operator" value={"/"} onClick={operatorHandle}><FaDivide /></button>
                <button className="button number" value={7} onClick={inputHandle}>7</button>
                <button className="button number" value={8} onClick={inputHandle}>8</button>
                <button className="button number" value={9} onClick={inputHandle}>9</button>
                <button className="button operator" value={"*"} onClick={operatorHandle}>x</button>
                <button className="button number" value={4} onClick={inputHandle}>4</button>
                <button className="button number" value={5} onClick={inputHandle}>5</button>
                <button className="button number" value={6} onClick={inputHandle}>6</button>
                <button className="button operator" value={"+"} onClick={operatorHandle}>+</button>
                <button className="button number" value={1} onClick={inputHandle}>1</button>
                <button className="button number" value={2} onClick={inputHandle}>2</button>
                <button className="button number" value={3} onClick={inputHandle}>3</button>
                <button className="button operator" value={"-"} onClick={operatorHandle}>-</button>
                <button className="button number double" value={0} onClick={inputHandle}>0</button>
                <button className="button number" value={"."} onClick={inputHandle}>.</button>
                <button className="button operator" value={"="} onClick={equals}>=</button>

            </div>
            <div className="navbar"></div>



        </div>
    )
};
export { Calculator };