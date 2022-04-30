import React from 'react';
import {
    Container, Grid, Button, Box, Slider,
} from "@material-ui/core";
import { AlgoName } from '../data';


const Navbar = ({state, reducer, dispatch, RunAlgo, reset}) =>{
    const wall_weight = 1e6;

    function SmallButton({e, msg}){
        return(
            <Box m={1}>
                <Button
                    onClick={e}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled = {state.start && msg !== "Reset"}
                >
                {msg}</Button>
            </Box>
        );
    }

    return( 
        <Container maxWidth="xl" className="container">
                <Grid container justify="center" >
                    <Grid item md={4} className="item">
                        <p>Select and double click on Grid to Change start and end positions</p>
                        <SmallButton 
                            e = {() => dispatch({type : 'chooseStart'})} 
                            msg = {"Choose StartPoint"}
                        />
                        <SmallButton 
                             e = {() => dispatch({type : 'chooseEnd'})} 
                             msg = {"Choose EndPoint"}
                        />
                        <SmallButton
                            e = {reset}
                            msg = {"Reset"}
                        />
                    </Grid>
                    <Grid item md={4} className="item">
                        <p>Click and drag to create walls and Weights</p>
                        <SmallButton
                            e = {() => dispatch({type : 'chooseWeight', payload : wall_weight})}
                            msg = {"Set Walls"}
                        />
                        <Grid container padding={1}>
                            <Grid item xs={6}>
                                <p>Weight of nodes to assign</p>
                                <input
                                    type="range"
                                    max="20"
                                    min="2"
                                    id="weight"
                                    onChange={() => dispatch({type : 'chooseWeight', payload : document.getElementById("weight").value})}
                                    disabled = {state.start}
                                ></input>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Speed of Animation</p>
                                <input
                                    type="range"
                                    max="5000"
                                    min="50"
                                    id="time"
                                ></input>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="item">
                        <p>Choose one of the following Algorithms</p>
                        <Grid container>
                            {Object.keys(AlgoName).map(e => (
                                <Grid item xs={6} key={e}>
                                    <Button
                                        onClick={() => RunAlgo(e)}
                                        color="primary"
                                        size="small"
                                        disabled = {state.start}
                                    >
                                    {e}</Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
    );
};

export default Navbar;