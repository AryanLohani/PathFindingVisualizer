export function removeWalls(grid,rows,cols,wall_weight){
    let new_grid = grid.slice();
    for(let i=0;i<rows*cols;i++){
        if(new_grid[i].Weight!=wall_weight) new_grid[i].Weight = 1;
    }
    return new_grid;
}