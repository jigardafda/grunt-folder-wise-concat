/*
 * grunt-folderWiseConcat
 * https://github.com/jigardafda/grunt-folderWiseConcat
 *
 * Copyright (c) 2014 Jigar Dafda
 * Licensed under the MIT license.
 */

/*global module,require*/
module.exports = function (grunt) {
	'use strict';

	grunt.registerMultiTask('folderWiseConcat', 'Grunt plug-in to concatenate files folder wise.', function () {
		var path = require('path'),
			options = this.options({
				separator: '\n' // Concate Seprator
			});

		// Iterate over all specified folder groups.
		this.files.forEach(function (f) {
			// Filtering on invalide folder path
			f.src.filter(function (folderPath) {
				// Warn on invalid source folder path.
				if (!grunt.file.isDir(folderPath)) {
					grunt.log.warn('Source folder "' + folderPath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (folderpath) {
				var orderFilePath = path.join(folderpath, "__order.json"), files, allfs, out;
				
				if (grunt.file.exists(orderFilePath)) {
					// if __order.json file exits read file order from here  
					allfs = grunt.file.readJSON(orderFilePath);
					if (!(allfs && allfs.files)) {
						grunt.log.warn('Unable to read __order.json : ' + orderFilePath);
					}
				} else {
					// finding all files and folders in current directory
					allfs = grunt.file.expand(path.join(folderpath, "*"));
				}
				
				// Concating all the files availble in allfs array 
				out = allfs.filter(function (file) {
					if (!grunt.file.isFile(file)) {
						return false;
					} else {
						return true;
					}
				}).map(function (file) {
					return grunt.file.read(file);
				}).join(options.separator);

				// write concatenated file's result
				grunt.file.write(f.dest, out);
			});

		});

		// Print a success message.
		grunt.log.writeln('Folder wise concated file created.');
	});
};