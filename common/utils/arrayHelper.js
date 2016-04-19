'use strict';

const ArrayHelper = {
	neighbors(array, currentNode, diagonals){
		if(	typeof array == 'undefined' ||
			typeof array[0] == 'undefined' ||
			typeof array[0][0] == 'undefined') {
			throw new Error("Not a two dimensional array");
		}

		let ret = [], x, y;

		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[0].length; j++) {
				if(array[i][j] == currentNode){
					x = i;
					y = j;
					break;
				}
			}
		}

        // West
        if(array[x-1] && array[x-1][y]) {
            ret.push(array[x-1][y]);
        }
 
        // East
        if(array[x+1] && array[x+1][y]) {
            ret.push(array[x+1][y]);
        }
 
        // South
        if(array[x] && array[x][y-1]) {
            ret.push(array[x][y-1]);
        }
 
        // North
        if(array[x] && array[x][y+1]) {
            ret.push(array[x][y+1]);
        }
 
        if (diagonals) {
 
            // Southwest
            if(array[x-1] && array[x-1][y-1]) {
                ret.push(array[x-1][y-1]);
            }

            // Southeast
            if(array[x+1] && array[x+1][y-1]) {
                ret.push(array[x+1][y-1]);
            }
 
            // Northwest
            if(array[x-1] && array[x-1][y+1]) {
                ret.push(array[x-1][y+1]);
            }
 
            // Northeast
            if(array[x+1] && array[x+1][y+1]) {
                ret.push(array[x+1][y+1]);
            }
        }

        return ret;
	}
};

module.exports = ArrayHelper;