import React, { useState } from "react";

function ParentComponent(){
    const [count, setCount] = useState(0)
    return(
        <>
          <ChildComponent count ={count} setCount={setCount}/>
        </>
    )
}

function ChildComponent({count,setCount}){
     return(
        <div>
           <p>Count: {count}</p>
           <button onClick={() => setCount(count+1)}>Increase</button>
        </div>
     )
}

let count = 0
function IncrementCount(){
    count++
    console.log(count)
}

IncrementCount()
IncrementCount()

const initialState = {
    count:0,
}

function countReducer(state = initialState, action){
    switch(action.type){
        case 'INCREMENT':
            return {count: state.count+1}

        default:
            return state
    }
}
const store = createStore(countReducer);

store.dipatch({type : 'INCREMENT'})