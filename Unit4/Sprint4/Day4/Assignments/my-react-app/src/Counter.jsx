import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./action";

const Counter = () =>{
    const count=useSelector((state) => state.count)
    const dispatch = useDispatch()
    return(
        <div>
            <h2>Count: {count}</h2>
            <button onClick={()=> dispatch(increment)}>Increment</button>
            <button onClick={()=> dispatch(decrement)}>Decrement</button>
        </div>
    )
}
export default Counter