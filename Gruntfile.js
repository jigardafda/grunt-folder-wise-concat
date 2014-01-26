/*
 * grunt-folderWiseConcat
 * https://github.com/jigardafda/grunt-folderWiseConcat
 *
 * Copyright (c) 2014 Jigar Dafda
 * Licensed under the MIT license.
 */

/*global module*/
module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'tasks/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['test/tmp']
		},

		// Configuration to be run (and then tested).
		folderWiseConcat: {
			SimpleConc: {
				files: {
					'test/SimpleConc.js': ['test/SimpleConc']
				}
			},
			OrderFile: {
				files: {
					'test/OrderFile.js': ['test/OrderFile']
				}
			},
			MultiLevel: {
				files: {
					'test/MultiLevel.js': ['test/MultiLevel/**/*']
				}
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'folderWiseConcat']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);
};