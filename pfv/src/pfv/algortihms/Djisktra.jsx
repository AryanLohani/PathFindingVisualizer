
export  function Djisktra(rows,cols,startnode,endnode,grid){
    const INF = 100000,size = grid.length;
    
    function node(row,col){
        return row*cols + col;
    }
    function isNeighbor(row,col){
        return (row>=0 && row<rows) && (col>=0 && col<cols) && (!grid[node(row,col)][5]);
    }
    function calculateShotestPath(distance){
        let shortestpath=[];    
        let r = Math.floor(endnode/cols),c=endnode%cols, dist =INF;   
        while(true){
            let new_row=r,new_col=c;
            for(let row=r-1;row<=r+1;row++){
                for(let col=c-1;col<=c+1;col++){
                    if(Math.abs(r-row)+Math.abs(c-col)==1 && isNeighbor(row,col)){
                        if(distance[node(row,col)]<dist){
                            dist = distance[node(row,col)];
                            new_row =row;
                            new_col =col;
                        }
                    }
                }
            }
            if(new_row==r && new_col==c){
                shortestpath.reverse();
                shortestpath.shift();
                return shortestpath;
            }
            shortestpath.push(node(new_row,new_col));
            [r,c] = [new_row,new_col];
        }
    }

    var OrderOfVisitedNodes = [];
    var distance = new Array(size).fill(INF);
    distance[startnode]=0;
    var queue = [];
    queue.push([Math.floor(startnode/cols),startnode%cols]);
    while(queue.length>0){
        let r = queue[0][0], c = queue[0][1];
        var x = queue.shift();
        for(let row=r-1;row<=r+1;row++){
            for(let col=c-1;col<=c+1;col++){
                if(Math.abs(r-row)+Math.abs(c-col)==1 && isNeighbor(row,col)){
                    if(distance[node(row,col)]>distance[node(r,c)]+1){
                        if(node(row,col)==endnode){
                            return [OrderOfVisitedNodes,calculateShotestPath(distance)];
                        }
                        OrderOfVisitedNodes.push(node(row,col));
                        distance[node(row,col)] = distance[node(r,c)]+1;
                        queue.push([row,col]);
                    }
                }
            }
        }
    }
    return[OrderOfVisitedNodes,[]];
}