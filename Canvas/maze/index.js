'use strict';
class UnionSet {
    constructor(size) {
        this.set = new Array(size);
        for (let i = this.set.length - 1; i >= 0; i--) {
            this.set[i] = -1;
        }
        console.log(this.set);
    }
    union(root1, root2) {
        this.set[root1] = root2;
        if (this.set[root1] < this.set[root2]) {
            this.set[root2] = root1;
        } else {
            if (this.set[root1] === this.set[root2]) {
                this.set[root2]--;
            }
            this.set[root1] = this.set[root2];
        }
    }
    findSet(x) {
        // console.log(this.set[x])
        while(this.set[x] >= 0){
            x = this.set[x];
        }
        return x;
    }
    sameSet(x, y) {
        console.log(this.findSet(x))
        console.log(this.findSet(y))
        return this.findSet(x) === this.findSet(y);
    }
    unionElement(x, y) {
        this.union(this.findSet(x), this.findSet(y));
    }
}
class Maze {
    constructor(columns, rows, canvas) {
        this.columns = columns;
        this.rows = rows;
        this.cells = columns * rows;
        this.linkedMap = {};
        console.log(this.cells);
        this.unionSets = new UnionSet(this.cells);
        this.canvas = canvas;
    }
    generate() {
        let i = 0
        // while (!this.firstLastLinked()) {
        while (i< 10000) {
            let cellsPair = this.pickRandomCellsPair();
            console.log(cellsPair);
            console.log(!this.unionSets.sameSet(cellsPair[0], cellsPair[1]));
            if (!this.unionSets.sameSet(cellsPair[0], cellsPair[1])) {
                this.unionSets.unionElement(cellsPair[0], cellsPair[1]);
                this.addLinkedMap(cellsPair[0], cellsPair[1]);
                console.log(this.linkedMap);
                i++
            }
        }
        console.log(this.firstLastLinked())
    }
    pickRandomCellsPair() {
        let cell = (this.cells * Math.random()) >> 0,
            neiborCells = [],
            row = (cell / this.columns) >> 0,
            column = cell % this.rows;
        if (row !== 0) {
            neiborCells.push(cell - this.columns);
        }
        if (row !== this.rows - 1) {
            neiborCells.push(cell + this.columns);
        }
        if (column !== 0) {
            neiborCells.push(cell - 1);
        }
        if (column !== this.columns - 1) {
            neiborCells.push(cell + 1);
        }
        let index = (neiborCells.length * Math.random()) >> 0;
        return [cell, neiborCells[index]];
    }
    addLinkedMap(x, y) {
        if (!this.linkedMap[x]) this.linkedMap[x] = [];
        if (!this.linkedMap[y]) this.linkedMap[y] = [];
        if (this.linkedMap[x].indexOf(y) < 0) {
            this.linkedMap[x].push(y);
        }
        if (this.linkedMap[y].indexOf(x) < 0) {
            this.linkedMap[y].push(x);
        }
    }
    firstLastLinked() {
        return this.unionSets.sameSet(0, 15);
    }
    draw() {
        let linkedMap = this.linkedMap,
            canvasBuffer = document.createElement('canvas'),
            cellWidth = this.canvas.width / this.columns,
            cellHeight = this.canvas.height / this.rows;
        // console.log(linkedMap);
        canvasBuffer.width = this.canvas.width;
        canvasBuffer.height = this.canvas.height;
        let ctx = canvasBuffer.getContext('2d');
        ctx.translate(.5, .5);
        for (let i = 0; i < this.cells; i++) {
            let row = i / this.columns >> 0,
                column = i % this.rows;
            if (column !== this.columns - 1 && (!linkedMap[i] || linkedMap[i].indexOf(i + 1) < 0)) {
                ctx.moveTo((column + 1) * cellWidth >> 0, row * cellHeight >> 0);
                ctx.lineTo((column + 1) * cellWidth >> 0, (row + 1) * cellHeight >> 0);
            }
            if (row !== this.rows - 1 && (!linkedMap[i] || linkedMap[i].indexOf(i + this.columns) < 0)) {
                ctx.moveTo(column * cellWidth >> 0, (row + 1) * cellHeight >> 0);
                ctx.lineTo((column + 1) * cellWidth >> 0, (row + 1) * cellHeight >> 0);
            }
        }
        ctx.stroke();
        this.canvas.getContext('2d').drawImage(canvasBuffer, 0, 0)
    }
}
var canvas = document.getElementById('canvas');
console.log(canvas)
var maze = new Maze(60, 60, canvas);
console.time('generate maze');
maze.generate();

console.timeEnd('generate maze');
console.time('draw maze');
maze.draw();
console.timeEnd('draw maze')