'use strict';

var arrayHelper = require('./utils/arrayHelper');

class Node {
	constructor(x, y, f, g, h, isWall) {
		this.x = x;
		this.y = y;
		this.f = f;
		this.g = g;
		this.h = h;
		this.isWall = isWall;
		this.parent = null;		
	}
}

module.exports = class AStar {

	static createNodeGrid(grid){
		if(	typeof grid == 'undefined' || 
			typeof grid[0] == 'undefined' ||
			typeof grid[0][0] == 'undefined') {
			throw new Error("Not a two dimensional array");
		}

		if(typeof grid[0][0].isWall !== 'function'){
			throw new Error("Grid does not have the method isWall");
		}

		let nodeGrid = [];
		for (var i = 0; i < grid.length; i++) {
			nodeGrid[i] = [];
			for (var j = 0; j < grid[0].length; j++) {
				nodeGrid[i][j] = new Node(i, j, 0, 0, 0, grid[i][j].isWall());
			};
		};

		return nodeGrid;
	}

	static search(nodes, start, end) {
		if(!(start instanceof Node) || !(end instanceof Node))
			throw new Error("Start or End is not an instance of Node");

		let closedSet = [],
			openSet = [],
			currentNode;

		openSet.push(start);

		while(openSet.length > 0){

			let fIndex = 0;
			for (var i = 0; i < openSet.length; i++) {
				if(openSet[i].f < openSet[fIndex].f)
					fIndex = i;
			};
			currentNode = openSet[fIndex];

			// Found goal, return the path
			if(currentNode == end){
				let curr = currentNode,
					ret = [];

				while(curr.parent){
					ret.push(curr);
					curr = curr.parent;
				}

				return ret.reverse();
			}

			openSet.splice(openSet.indexOf(currentNode), 1);
			closedSet.push(currentNode);

			let neighbors = arrayHelper.neighbors(nodes, currentNode, false);

			for (var i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if(closedSet.indexOf(neighbor) > -1 || neighbor.isWall){
					continue; // Not a valid node to walk to
				}

				let gScore = currentNode.g + 1, // 1 is distance to to it's neighbor
					bestG = false; 

				if(openSet.indexOf(neighbor) < 0){
					// We have not been here before therefor the best g
					bestG = true;
					neighbor.h = AStar.manhattan(neighbor, end);
					openSet.push(neighbor);
				} 
				else if(gScore < neighbor.g){
					bestG = true;
				}

				if(bestG){
					neighbor.parent = currentNode;
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;
				}
			};

			//console.log("hej");
		}

		return []; // Did not find any path
	}

	static manhattan(pos0, pos1) {
		let d1 = Math.abs(pos1.x - pos0.x);
		let d2 = Math.abs(pos1.y - pos0.y);
		return d1 + d2;
	}
}