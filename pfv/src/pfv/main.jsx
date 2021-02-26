import React,{useEffect, useState} from 'react';
import Node from "../pfv/node/node.jsx"
import {Djisktra} from "../pfv/algortihms/Djisktra"
import "./main.css";

var rows=15,cols=Math.floor((document.body.clientWidth -80)/40);


const GenerateGrid = () =>{
    let grid=[];
    for(let row=0;row<rows;row++){
        for(let col=0;col<cols;col++){
            grid.push(CreateNode(row,col));
        }
    }
    return grid;
};

const CreateNode = (row,col) =>{
    return {
        idx: cols*row + col,
        row:row,
        col:col,
        isVisited:false,
        isPath:false,
        Weight:1,
    }
}

const App =(()=>{
    const wall_weight = 1e6; 
    const [grid,setGrid] = useState(GenerateGrid());
    const [start,setStart] = useState(true);
    const [position,setPosition] = useState([0,rows*cols -1]);
    const [pressed, setPressed] = useState(false);
    const [weight, setWeight] = useState(wall_weight);
    

    const handlechange = (idx) =>{
        let array = position.slice();
        if(start) array[0] = idx;
        else array[1] = idx;
        setPosition(array);
    };
    
    const AnimateShortestpath = (shortestpath,timeout) =>{
        for(let i=0;i<shortestpath.length;i++){
            setInterval(()=>{
                let newgrid = grid.slice();
                newgrid[shortestpath[i]].isPath = true;
                setGrid(newgrid);
            },200*(i)+10*timeout);
        }
    }

    useEffect(()=>{
        document.title = weight;
    })

    const AnimateDjisktra = (OrderOfVisitedNodes) =>{
        for(let i=0;i<OrderOfVisitedNodes.length;i++){
            setInterval(()=>{
                let newgrid = grid.slice();
                newgrid[OrderOfVisitedNodes[i]].isVisited = true;
                setGrid(newgrid);
            },5*i);
        }
    }

    const runDjisktra = () =>{
        const [OrderOfVisitedNodes,shortestpath] = Djisktra(rows,cols,position[0],position[1],grid);
        console.log(OrderOfVisitedNodes);
        AnimateDjisktra(OrderOfVisitedNodes);
        AnimateShortestpath(shortestpath,OrderOfVisitedNodes.length+1);
    };


    const handlewalls = (idx) =>{
        if(pressed){
            let newgrid = grid.slice();
            newgrid[idx].Weight = weight;
            setGrid(newgrid);
        }
    };

    return(
        <div>
            <button onClick={() =>setStart(true)}>Choose Start Point</button>
            <button onClick={() =>setStart(false)}>Choose End Point</button>
            <button onClick={() =>setWeight(wall_weight)}>Set Walls</button>
            <button onClick={() => setWeight(document.getElementById("weight").value)}> Set Weight</button>
            <input type="range" max="50" min = "2"  id="weight"></input>
            <br/>
            <button onClick={() =>runDjisktra()}>Djisktra</button>
            <div className="canvas" style={{width:(cols)*42}}>
                {grid.map(e=>(
                    <div 
                        onDoubleClick={() =>handlechange(e.idx)}
                        onMouseDown={() =>setPressed(true)}
                        onMouseUp = {() =>setPressed(false)}
                        onMouseEnter={() =>handlewalls(e.idx)}    
                    >
                        <Node
                            key={e}
                            idx ={e.idx}
                            isVisited = {e.isVisited}
                            isPath = {e.isPath}
                            Weight = {e.Weight}
                            isStart = {position[0]===e.idx}
                            isEnd = {position[1]===e.idx}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
export default App;