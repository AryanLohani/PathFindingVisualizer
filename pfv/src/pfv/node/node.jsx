import React,{useEffect, useState} from 'react';
import "./node.css";

const Node = (props) =>{
    const wall_weight = 1e6; 
    const   isStart = props.isStart,
            isEnd = props.isEnd,
            isVisited=props.isVisited,
            isPath = props.isPath,
            Weight = props.Weight,
            idx = props.idx;
    var classes = "node ";
    if(isStart) classes+="startnode ";
    else if(isEnd) classes+="endnode ";
    else if(isPath) classes+="path ";
    else if(isVisited) classes+="visited ";
    else {
        if(Weight==wall_weight) classes+="wall ";
        else if(Weight>1) classes+="weight ";
    }


    return(
        <div className={classes}></div>
    )
};
export default Node;