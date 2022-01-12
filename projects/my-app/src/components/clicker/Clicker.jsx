import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shiftValue } from "../../store/clicker/actions";

import "./Clicker.scss";

const Clicker = () => {

    const value = useSelector(state => state.clicker.value)
    const dispatch = useDispatch();

    const handleClick = (arg, e) => {
        e.preventDefault();
        dispatch(shiftValue(arg));
    }

    return (
        <div className="clicker">
            <span className="clicker__label">{value}</span>
            <div>
                <button onClick={(e) => handleClick(+1, e)}>+</button>
                <button onClick={(e) => handleClick(-1, e)}>-</button>
            </div>
        </div>
    )
}


export default Clicker;