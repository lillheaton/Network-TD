'use strict';

const Steering = {

	seek(position, maxVelocity, target){
		let velocity = target.clone().subtract(position).normalize().multiply(maxVelocity);
		position.add(velocity);
	}

};

// Will work for both es6 and node
module.exports = Steering;