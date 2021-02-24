import React,{useEffect, useState} from 'react';
import Node from "../pfv/node/node.jsx"
import {Djisktra} from "../pfv/algortihms/Djisktra"
import "./main.css";

var rows=15,cols=Math.floor((document.body.clientWidth -80)/40);
const App =(()=>{
    const GenerateGrid = () =>{
        let grid=[];
        for(let row=0;row<rows;row++){
            for(let col=0;col<cols;col++){
                grid.push([
                    row*cols+col,
                    row,
                    col,
                    false,
                    false,
                    false,
                ]);
            }
        }
        return grid;
    }

    const [grid,setGrid] = useState(GenerateGrid());
    const [current,setCurrent] = useState([true,false]);
    const [position,setPosition] = useState([0,rows*cols -1]);
    const [pressed, setPressed] = useState(false);

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

    
    const AnimateShortestpath = (shortestpath,timeout) =>{
        for(let i=0;i<shortestpath.length;i++){
            setInterval(()=>{
                let newgrid = grid.slice();
                newgrid[shortestpath[i]][4] = true;
                setGrid(newgrid);
            },200*(i)+10*timeout);
        }
    }

    const AnimateDjisktra = (OrderOfVisitedNodes) =>{
        for(let i=0;i<OrderOfVisitedNodes.length;i++){
            setInterval(()=>{
                let newgrid = grid.slice();
                newgrid[OrderOfVisitedNodes[i]][3] = true;
                setGrid(newgrid);
            },5*i);
        }
    }

    const runDjisktra = () =>{
        const [OrderOfVisitedNodes,shortestpath] = Djisktra(rows,cols,position[0],position[1],grid);
        AnimateDjisktra(OrderOfVisitedNodes);
        AnimateShortestpath(shortestpath,OrderOfVisitedNodes.length+1);
    };

    const handlepress = (e)=>{
        setPressed(e);
    };

    const handlewalls = (e) =>{
        if(pressed){
            let newgrid = grid.slice();
            newgrid[e][5] = true;
            setGrid(newgrid);
        }
    };

    return(
        <div>
            <button onClick={() =>handleclick(0)}>Choose Start Point</button>
            <button onClick={() =>handleclick(1)}>Choose End Point</button>
            <br/>
            <button onClick={() =>runDjisktra()}>Djisktra</button>
            <div className="canvas" style={{width:(cols)*42}}>
                {grid.map(e=>(
                    <div 
                        onDoubleClick={() =>handlechange(e[0])}
                        onMouseDown={() =>handlepress(true)}
                        onMouseUp = {() =>handlepress(false)}
                        onMouseEnter={() =>handlewalls(e[0])}    
                    >
                        <Node
                            key={e}
                            isVisited = {e[3]}
                            isPath = {e[4]}
                            isWall = {e[5]}
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