import React,{useEffect, useState} from 'react';
import "./node.css";

const Node = (props) =>{
    const isStart = props.isStart, isEnd = props.isEnd, isVisited=props.isVisited,isPath = props.isPath;
    var classes = "node ";
    if(isStart) classes+="startnode ";
    if(isEnd) classes+="endnode ";
    if(isPath) classes+="path ";
    else{
        if(isVisited) classes+="visited "
    }
    return(
        <div className={classes}></div>
    )
};
export default Node;