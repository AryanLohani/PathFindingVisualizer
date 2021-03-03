
export function Djisktra(rows,cols,startnode,endnode,grid){
    const INF = 1e9 , size = grid.length , wall_weight = 1e6;
    
    function node(row,col){
        return row*cols + col;
    }
    function isNeighbor(row,col){
        return (row>=0 && row<rows) && (col>=0 && col<cols) && (grid[node(row,col)].Weight != wall_weight)
    }
    function calculateShotestPath(distance){
        let shortestpath=[];    
        let r = grid[endnode].row,c = grid[endnode].col, dist = INF;   
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
    
    let OrderOfVisitedNodes = [];
    let distance = new Array(size).fill(INF);
    distance[startnode]=0;
    let queue = [];
    queue.push(startnode);

    while(queue.length>0){
        queue.sort(
            function(a,b){
                return distance[a] - distance[b];
            }
        );
        let u = queue[0];
        if(u!=startnode)OrderOfVisitedNodes.push(u);
        let r = grid[u].row , c = grid[u].col;
        let x = queue.shift();
        for(let row=r-1;row<=r+1;row++){
            for(let col=c-1;col<=c+1;col++){
                if(Math.abs(r-row)+Math.abs(c-col)==1 && isNeighbor(row,col)){
                    let v = node(row,col);
                    if(distance[node(row,col)]>distance[u]+grid[v].Weight){
                        if(v==endnode){
                            return [OrderOfVisitedNodes,calculateShotestPath(distance)];
                        }
                        distance[v] = distance[u]+grid[v].Weight;
                        queue.push(v);
                    }
                }
            }
        }
    }
    return[OrderOfVisitedNodes,[]];
}