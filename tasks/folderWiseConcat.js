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
		var path = require('path'), orderFile = require('./orderFileHandler'),
			options = this.options({
				separator: '\n', // Concate Seprator
				orderFileName: "__order.json"
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
				var orderFilePath = path.join(folderpath, options.orderFileName), expandedFiles, outStr;
				
				if (grunt.file.exists(orderFilePath)) {
					// if __order.json file exits read file order from here 
					expandedFiles = orderFile.getInst(orderFilePath, grunt).getFilesList();
					
					if (!expandedFiles) {
						grunt.log.warn('Unable to read __order.json : ' + orderFilePath);
					}

				} else {
					// finding all files and folders in current directory
					expandedFiles = grunt.file.expand(path.join(folderpath, '*'));
				}
				
				console.log(expandedFiles);
				
				// Concating all the files availble in expandedFiles array 
				outStr = expandedFiles.filter(function (file) {
					if (!grunt.file.isFile(file)) {
						return false;
					} else {
						return true;
					}
				}).map(function (file) {
					console.log('reading file', file);
					console.log(grunt.file.read(file));
					return grunt.file.read(file);
				}).join(options.separator); // concating using seprator provided in the options 

				console.log('final out', outStr);
				// write concatenated output to dest file
				grunt.file.write(f.dest, outStr);

			});

		});

		// Print a success message.
		grunt.log.writeln('Folder wise concated file(s) created.');
	});
};
