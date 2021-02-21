    import React,{useEffect, useState} from 'react';
    import "./main.css";

var rows=20,cols=50,nodes=[];
const App =(()=>{   
    const [current,setCurrent] = useState([true,false]);
    const [position,setPosition] = useState([0,749]);
    const classes = ['startnode','endnode','blocks'];
    nodes=[];
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            nodes.push([i,j,'blocks']);
        }
    }

    const node_index = (i,j) =>{
        return i*cols +j;
    };

    const handleclick = (e) =>{
        let array = [false,false];
        array[e]=true;
        setCurrent(array);
    };

    const handlechange = (e) =>{
        let array = [];
        for(let i=0;i<2;i++){
            if(current[i]){
                array.push(node_index(e[0],e[1]));
            }
            else array.push(position[i]);
        }
        setPosition(array);
    };

    // useEffect(()=>{
    //     for(let i=0;i<2;i++){
    //         nodes[position[i]][2] = classes[i];
    //         console.log(nodes[position[i]]);
    //     }
    // },[position]); 
    const checkposition =(e) =>{
        for(let i=0;i<2;i++){
            if(node_index(e[0],e[1])===position[i]){
                return classes[i];
            }
        }
        return classes[2];
    };

    return(
        <div>
            <button onClick={() =>handleclick(0)}>Choose Start Point</button>
            <button onClick={() =>handleclick(1)}>Choose End Point</button>
            {/* <button onClick={() =>bfs()}>BFS</button> */}
            <div className="canvas" >
                {nodes.map(e=>(
                    <div className={`node ${checkposition(e)}`} onClick={() =>handlechange(e)}>
                    </div>
                ))}
            </div>
        </div>
    );
});
export default App;