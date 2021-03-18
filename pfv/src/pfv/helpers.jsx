export default function GenerateGrid(rows,cols){

    function CreateNode(row, col){
        return {
            idx: cols * row + col,
            row: row,
            col: col,
            isVisited: false,
            isPath: false,
            Weight: 1,
        }
    }

    let grid = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push(CreateNode(row, col));
        }
    }
    return grid;
};

