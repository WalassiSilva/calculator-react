import { useEffect, useState } from "react";
import {FaSignal, FaWifi, FaBatteryThreeQuarters} from "react-icons/fa";

import "./style.css"

const Statusbar = () => {

    const [time, setTime] =useState(new Date());


    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);

    },[]);

    return (
        <div className="wrapper">
            <div className="time">
                {time.toLocaleTimeString()}    
            </div>      
            <div className="icons">
                <FaSignal />
                <FaWifi />
                <FaBatteryThreeQuarters />    
            </div>  
        </div>
    );
};

export { Statusbar };