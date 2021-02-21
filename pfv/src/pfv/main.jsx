import React,{useEffect, useState} from 'react';
import Node from "../pfv/node/node.jsx"
import "./main.css";

var rows=20,cols=50,nodes=[];
const App =(()=>{   
    const [current,setCurrent] = useState([true,false]);
    const [position,setPosition] = useState([0,749]);
    nodes=[];
    for(let row=0;row<rows;row++){
        for(let col=0;col<cols;col++){
            nodes.push([
                row*cols+col,
                row,
                col,
            ]);
        }
    }

    const handleclick = (e) =>{
        let array = [false,false];
        array[e]=true;
        setCurrent(array);
    };

    const handlechange = (e) =>{
        let array = [];
        for(let i=0;i<2;i++){
            if(current[i]){
                array.push(e);
            }
            else array.push(position[i]);
        }
        setPosition(array);
    };

    return(
        <div>
            <button onClick={() =>handleclick(0)}>Choose Start Point</button>
            <button onClick={() =>handleclick(1)}>Choose End Point</button>
            {/* <button onClick={() =>bfs()}>BFS</button> */}
            <div className="canvas" >
                {nodes.map(e=>(
                    <div onClick={() =>handlechange(e[0])}>
                        <Node
                            key={e}
                            isStart = {position[0]===e[0]}
                            isEnd = {position[1]===e[0]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
export default App;