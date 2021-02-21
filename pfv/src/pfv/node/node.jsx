import React,{useEffect, useState} from 'react';
import "./node.css";

const Node = (props) =>{
    const isStart = props.isStart, isEnd = props.isEnd;
    var classes = "node ";
    if(isStart) classes+="startnode ";
    if(isEnd) classes+="endnode ";
    return(
        <div className={classes}></div>
    )
};
export default Node;