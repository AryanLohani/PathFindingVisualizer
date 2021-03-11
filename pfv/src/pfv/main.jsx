import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Button,Box,Slider,
} from "@material-ui/core";
import {

} from "@material-ui/system"
import Node from "../pfv/node/node.jsx"
import { Djisktra } from "../pfv/algortihms/Djisktra"
import "./main.css";

var rows = 15, cols = Math.floor((document.body.clientWidth - 80) / 40);


const GenerateGrid = () => {
    let grid = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push(CreateNode(row, col));
        }
    }
    return grid;
};

const AlgoDescription ={
    Djisktra:"Djisktra is a greedy Algorithm for finding the shortest path",
}

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

    const AnimateShortestpath = (shortestpath, timeout) => {
        for (let i = 0; i < shortestpath.length; i++) {
            setInterval(() => {
                let newgrid = grid.slice();
                newgrid[shortestpath[i]].isPath = true;
                setGrid(newgrid);
            }, 200 * (i) + 10 * timeout);
        }
    }

    useEffect(() => {
        document.title = weight;
    })

    const AnimateDjisktra = (OrderOfVisitedNodes) => {
        for (let i = 0; i < OrderOfVisitedNodes.length; i++) {
            setInterval(() => {
                let newgrid = grid.slice();
                newgrid[OrderOfVisitedNodes[i]].isVisited = true;
                setGrid(newgrid);
            }, 5 * i);
        }
    }

    const runDjisktra = () => {
        const [OrderOfVisitedNodes, shortestpath] = Djisktra(rows, cols, position[0], position[1], grid);
        AnimateDjisktra(OrderOfVisitedNodes);
        AnimateShortestpath(shortestpath, OrderOfVisitedNodes.length + 1);
        setDescription(AlgoDescription.Djisktra);
    };


    const handlewalls = (idx) => {
        if (pressed) {
            let newgrid = grid.slice();
            newgrid[idx].Weight = weight;
            setGrid(newgrid);
        }
    };

    return (
        <div className="y">
            <Container maxWidth="xl">
                <Grid container  justify="flex-start">
                    <Grid item md={3} className="item">
                        <h4>Select and double click on Grid to Change start and end positions</h4>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(true)}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                            Choose Start Point</Button>
                        </Box>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(false)}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                            Choose End Point</Button>
                        </Box>
                    </Grid>
                    <Grid item md={3} className="item">
                        <h4>Click and drag to create Walls and weights</h4>
                        <Box m={1}>
                            <Button
                                onClick={() => setWeight(wall_weight)}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                            Set Walls</Button>
                        </Box>
                        <Box m={1}>
                            <input type="range" max="50" min="2" id="weight"></input><br/>
                            <Button
                                onClick={() => setWeight(document.getElementById("weight").value)}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                            Set Weights</Button>
                        </Box>
                    </Grid>
                    <Grid item md={3} className="item">
                        <h4>Choose one of the following Algorithms</h4>
                        <Box m={1}>
                            <Button
                                onClick={() => runDjisktra()}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                            Djisktra</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <hr/>
            <div style={{ width: (cols) * 42 }}>
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
                        />
                    </div>
                ))}
            </div>
            <i>Algorithm Description: {Description}</i>
        </div>
    );
});
export default App;