import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Button,Box,Slider,
} from "@material-ui/core";
import {

} from "@material-ui/system"
import Node from "../pfv/node/node.jsx"
import { Djisktra } from "../pfv/algortihms/Djisktra";
import { removeWalls } from "../pfv/algortihms/Bfs";
import "./main.css";

var rows = 17, cols = Math.floor((document.body.clientWidth - 80) / 40) ;

const AlgoDescription ={
    Djisktra:"Djisktra is a greedy Algorithm for finding the shortest path. It works in O(V+ElogE) time complexity and is an weighted path finding algorithm",
    BFS:"BFS stands for breadth for search. The algorithm moves level by level. It works in o(V+E) time and is an Un-Weighted path finding algorithm",
}

const GenerateGrid = () => {
    const CreateNode = (row, col) => {
        return {
            idx: cols * row + col,
            row: row,
            col: col,
            isVisited: false,
            isPath: false,
            Weight: 1,
        }
    }
    let grid = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push(CreateNode(row, col));
        }
    }
    return grid;
};

const App = (() => {
    const wall_weight = 1e6;
    const [grid, setGrid] = useState(GenerateGrid());
    const [start, setStart] = useState(true);
    const [position, setPosition] = useState([0, rows * cols - 1]);
    const [pressed, setPressed] = useState(false);
    const [weight, setWeight] = useState(wall_weight);
    const [Description , setDescription] = useState("");

    const handlechange = (idx) => {
        let array = position.slice();
        if (start) array[0] = idx;
        else array[1] = idx;
        setPosition(array);
    };

    async function Animate(Arr, i ,key){
        if(i==Arr.length) return true;
        let myPromise = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                let newgrid = grid.slice();
                newgrid[Arr[i]][key] = true;
                setGrid(newgrid);
                resolve(true);
            },document.getElementById("time").value);
        });
        if(await myPromise){
            return Animate(Arr,i+1,key);
        }
    }

    async function AnimateVisitedOrder(Order , shortestpath){
        let myPromise = new Promise((resolve , reject) => {
            resolve(Animate(Order, 0 ,"isVisited"));
        });
        if(await myPromise){
            Animate(shortestpath, 0 ,"isPath");
        }
    }

    const runDjisktra = () => {
        const [Order, shortestpath] = Djisktra(rows, cols, position[0], position[1], grid);
        setDescription(AlgoDescription.Djisktra);
        AnimateVisitedOrder(Order , shortestpath);
        // AnimateShortestpath(shortestpath);
    };

    const runBFS = () =>{
        let new_grid = removeWalls(grid,rows,cols,wall_weight);
        setDescription(AlgoDescription.BFS);
        setGrid(new_grid);
        runDjisktra();
        setDescription(AlgoDescription.BFS);
    }

    const handlewalls = (idx) => {
        if (pressed) {
            let newgrid = grid.slice();
            newgrid[idx].Weight = weight;
            setGrid(newgrid);
        }
    };
    
    document.title = "Path Finding Visualizer";

    return (
        <section >
            <Container maxWidth="xl" className="container">
                <Grid container  justify="center" >
                    <Grid item md={4} className="item">
                        <p>Select and double click on Grid to Change start and end positions</p>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(true)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                            Choose Start Point</Button>
                        </Box>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(false)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                            Choose End Point</Button>
                        </Box>
                    </Grid>
                    <Grid item md={4} className="item">
                        <p>Click and drag to create walls and Weights</p>
                        <Box m={1}>
                            <Button
                                onClick={() => setWeight(wall_weight)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                            Set Walls</Button>
                        </Box>
                        <Grid container padding={1}>
                            <Grid item xs={6}>
                                <p>Weight of nodes to assign</p>
                                <input 
                                    type="range" 
                                    max="20" 
                                    min="2" 
                                    id="weight" 
                                    onChange = {() => setWeight(document.getElementById("weight").value)}
                                ></input>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Speed of Animation</p>
                                <input 
                                    type="range" 
                                    max="1000" 
                                    min="50" 
                                    id="time" 
                                ></input>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} className="item">
                        <p>Choose one of the following Algorithms</p>
                        <Grid container>
                            <Grid item xs={6}   className="border-right">
                                <u><h4>Weighted</h4></u>
                                <Button
                                    onClick={() => runDjisktra()}
                                    color="primary"
                                    size="small"
                                >
                                Djisktra</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <u><h4>Un-Weighted</h4></u>
                                <Button
                                    onClick={() => runBFS()}
                                    color="primary"
                                    size="small"
                                >
                                BFS</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <div style={{ width: (cols) * 42 }} className="grid">
                {grid.map(e => (
                    <div
                        onDoubleClick={() => handlechange(e.idx)}
                        onMouseDown={() => setPressed(true)}
                        onMouseUp={() => setPressed(false)}
                        onMouseEnter={() => handlewalls(e.idx)}
                    >
                        <Node
                            key={e}
                            idx={e.idx}
                            isVisited={e.isVisited}
                            isPath={e.isPath}
                            Weight={e.Weight}
                            isStart={position[0] === e.idx}
                            isEnd={position[1] === e.idx}
                            pressed = {pressed}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
});
export default App;