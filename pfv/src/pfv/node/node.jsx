import React,{useEffect, useState} from 'react';
import "./node.css";

const Node = (props) =>{
    const   isStart = props.isStart,
            isEnd = props.isEnd,
            isVisited=props.isVisited,
            isPath = props.isPath,
            isWall = props.isWall;
    var classes = "node ";
    if(isStart) classes+="startnode ";
    else if(isEnd) classes+="endnode ";
    else if(isPath) classes+="path ";
    else if(isVisited) classes+="visited ";
    else if(isWall) classes+="wall  ";

    return(
        <div className={classes}></div>
    )
};
export default Node;