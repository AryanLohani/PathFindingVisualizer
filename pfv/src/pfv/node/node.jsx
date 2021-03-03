import React,{useEffect, useState} from 'react';
import { IoIosArrowDropright ,IoIosArrowDropleft} from "react-icons/io";
import { MdLock } from "react-icons/md";
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
    if(isPath) classes+="path ";
    else if(isVisited) classes+="visited ";
    else if(Weight==wall_weight) classes+="wall "

    var src = "";
    const Icon =(e) =>{
        switch (true){
            case isStart:
                return(
                    <IoIosArrowDropright/>
                );
            case isEnd:
                return(
                    <IoIosArrowDropleft/>
                );
            case Weight>1 && Weight<wall_weight:
                return(
                    <MdLock/>
                );
            default:
                return null;
        }
    } 

    return(
        <div className={classes}>
            {Icon()}
        </div>
    );
};
export default Node;