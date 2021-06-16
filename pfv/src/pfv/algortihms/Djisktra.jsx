export function Djisktra(rows,cols,startnode,endnode,grid){
    const INF = 1e6 , size_of_grid = grid.length , wall_weight = 1e6;
    const iterate = [[1,0],[0,1],[-1,0],[0,-1]];

    function row(node){
        return Math.floor(node/cols);
    }
    function col(node){
        return node%cols;
    }
    function _node(row , col){
        return row*cols + col; 
    }
    function isNeighbor(row,col){
        return (row>=0 && row<rows) && (col>=0 && col<cols) && (grid[_node(row,col)].Weight != wall_weight);
    }

    // calculate all paths
    var distance = new Array(size_of_grid).fill(INF);
    var visited = new Array(size_of_grid).fill(false);
    var par = new Array(size_of_grid).fill(-1);
    distance[startnode] = 0;
    var queue = [startnode];
    var Order = [];

    function path(){
        var u = endnode;
        var shortestpath = [];
        while(u != -1){
            shortestpath.push(u);
            u = par[u];
        }
        shortestpath.reverse();
        return shortestpath;
    }
    while(queue.length){
        queue.sort((a , b) => distance[a] - distance[b]);
        let u = queue.shift();
        if(visited[u]) continue;
        let R = row(u) , C = col(u);
        visited[u] = true;
        Order.push(u);
        if(u == endnode){
            return [Order, path()];
        }

        for(var i in iterate){
            let r = R + iterate[i][0] , c = C + iterate[i][1];
            if(!isNeighbor(r,c)) continue;
            let next = _node(r,c);
            if(distance[u] + Number(grid[next].Weight) < distance[next]){
                distance[next] = distance[u] + Number(grid[next].Weight);
                par[next] = u;
                queue.push(next);
            }
        }
    }
    return[Order,[]];
}