// Conway's game of life

/* Steps to build the app
    1) Create the grid of the game
    2) Display the grid
    3) Populate the grid
    4) Implement the rules of the game
    5) optional: Iterate to make it alive (button then automatically) */

// Crate the grid of the game
function createGrid(row = 10, height = 10) {
    if (row < 4 || height < 4) { //fix a minimum size of the grid
        document.write('the grid is too small to populate life');
        return 0;
    } else { // requirements met     
        let grid = [];
        for (let i = 0; i < row; i++) { // create the rows
            let innerGrid = [];
            for (j = 0; j < height; j++) { // create the height
                innerGrid.push(0); //default empty element
            }
            grid.push(innerGrid);
        }
        return grid;
    }
}

//non descructive show of the grid
function showGrid(grid) {
    let display = convertGrid(grid);

    for (let i = 0; i < display.length; i++) {
        document.write(display[i].join('   '));
        document.write('<br>');
    }
}

//show the original grid with numbers 
function showGrid2(grid) {
    for (let i = 0; i < grid.length; i++) {
        document.write(grid[i].join('   '));
        document.write('<br>');
    }
}

// change the look of dead or alive cells
function convertGrid(grid) {
    let converted = createGrid(grid.length, grid[0].length);
    for (let x = 0; x < converted.length; x++) {
        for (let y = 0; y < converted[x].length; y++) {
            if (grid[x][y] === 0) {
                converted[x][y] = '..'; //how dead cells are displayed 
            } else {
                converted[x][y] = '*'; //how cells alive are displayed
            }

        }
    }
    return converted;
}

//populate the grid and avoid the border
function populate(grid) {
    let cell;
    for (let x = 1; x < grid.length - 1; x++) { //start at 1 and finish at end-1 so the borders can't be alive
        for (let y = 1; y < grid[x].length - 1; y++) {
            cell = Math.round(Math.random());
            grid[x][y] = cell;
        }
    }
}

// check who lives and who dies in the next gen
function nextGen(pastGen) {
    let futureGen = createGrid(pastGen.length, pastGen[0].length);
    for (let i = 1; i < pastGen.length - 1; i++) {
        for (let j = 1; j < pastGen[0].length - 1; j++) {
            //count the cell neightbours
            let cellCount = 0; //starting count
            cellCount += pastGen[i - 1][j - 1]; //check top-left
            cellCount += pastGen[i - 1][j]; //check top     
            cellCount += pastGen[i - 1][j + 1]; //check top-right    

            cellCount += pastGen[i][j - 1]; //check left
            cellCount += pastGen[i][j + 1]; //check right

            cellCount += pastGen[i + 1][j - 1]; //check bottom-left
            cellCount += pastGen[i + 1][j]; //check bottom     
            cellCount += pastGen[i + 1][j + 1]; //check bottom-right 
            console.log('Row: ', i, 'Position: ', j, 'Neigbours: ', cellCount); //check in the console if should be alive

            switch (cellCount) {
                case 2:
                    futureGen[i][j] = pastGen[i][j];
                    break; //if dead stay dead if alive keep alive
                case 3:
                    futureGen[i][j] = 1;
                    break; //you are alive!!!
                default:
                    futureGen[i][j] = 0; // all other cases you die
            }

        }
    }
    return futureGen;
}

function refresh() {
    location.reload();
}

// Let the game start!! 
let presentGen = createGrid(10, 30); // create the grid
populate(presentGen); // populate it
showGrid(presentGen); // show 
document.write('<br>');
let futureGen = nextGen(presentGen); // create next generation
showGrid(futureGen); // show it