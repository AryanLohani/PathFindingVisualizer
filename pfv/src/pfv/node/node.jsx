import React  from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LockIcon from '@material-ui/icons/Lock';
import "./node.css";


const Node = (props) =>{
    const wall_weight = 1e6; 
    const   isStart = props.isStart,
            isEnd = props.isEnd,
            isVisited=props.isVisited,
            isPath = props.isPath,
            Weight = props.Weight;
    var classes = "node ";
    if(isPath) classes+="path ";
    else if(isVisited) classes+="visited ";
    else if(Weight==wall_weight) classes+="wall "

    const Icon =() =>{
        switch (true){
            case isStart:
                return(
                    <PlayArrowIcon color="primary" fontSize="large"/>
                );
            case isEnd:
                return(
                    <HighlightOffIcon color="secondary" fontSize="medium"/>
                );
            case Weight>1 && Weight<wall_weight:
                return(
                    <LockIcon fontSize="small"/>
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