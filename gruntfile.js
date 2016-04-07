
module.exports = function(grunt){
	'use strict';

	require('load-grunt-tasks')(grunt);

	/**
	 * Grunt config
	 */
	grunt.initConfig({

		/***************************
		 * Settings
		 ***************************/
		settings: {
			dev: 'client/src',
			dist: 'client/dist'
		},

		express:{
			options: {
				harmony: true
				//background: false
			},
			dev: {
				options: {
					script: './server/app.js'
				}
			}
		},

		/***************************
		 * Watch
		 ***************************/
		watch: {
			options: {
		    	livereload: false
			},
			/*express: {
				files: ['<%= settings.dev %>/js/*.js', '<%= settings.dev %>/app.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			}*/
		},

		/***************************
		 * Browserify
		 ***************************/
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				plugin: [
				],
				transform: [
					['babelify', {
						presets: ['es2015']
					}]
				]
			},
			dev: {
				options: {
					watch: true
				},
				files: [{
					src: ['<%= settings.dev %>/app.js'],
					dest: '<%= settings.dist %>/js/game.js'
				}]
			}
		}
	});

	grunt.registerTask('dev', [
		'browserify:dev',
		'express:dev',
		'watch'
	]);

	//
	// Default
	//
	grunt.registerTask('default', 'dev');
};