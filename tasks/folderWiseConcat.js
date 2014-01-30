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
	var path = require('path'), fs = require('fs');
	grunt.registerMultiTask('folderWiseConcat', 'Grunt plug-in to concatenate files folder wise.', function () {
		var orderFile = require('./orderFileHandler'),
			options = this.options({
				separator: '\n', // Concate Seprator
				orderFileName: "__order.json",
				autoConcatAll: true,
				banner: ''
			}),
			destTrack = [];

		// Iterate over all specified folder groups.
		this.files.forEach(function (f) {
			// Filtering on invalide folder path
			f.src.filter(function (folderPath) {
				// Warn on invalid source folder path.
				if (!grunt.file.isDir(folderPath)) {
					//grunt.log.warn('Source folder "' + folderPath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (folderpath) {
				var orderFilePath = path.join(folderpath, options.orderFileName), expandedFiles, outStr, orderFileInst, outfile = f.dest;

				if (!options.autoConcatAll || grunt.file.exists(orderFilePath)) {
					// if __order.json file exits read file order from here 
					orderFileInst = orderFile.getInst(orderFilePath, grunt);
					expandedFiles = orderFileInst.getFilesList();

					if (!expandedFiles) {
						grunt.log.warn('Unable to read __order.json : ' + orderFilePath);
					}

					if (orderFileInst.getOutputFilePath()) {
						outfile = path.join(path.dirname(orderFilePath), orderFileInst.getOutputFilePath());
					}

				} else {
					// finding all files and folders in current directory
					expandedFiles = grunt.file.expand(path.join(folderpath, '*'));
				}

				// Concating all the files availble in expandedFiles array 
				outStr = expandedFiles.filter(function (file) {
					if (!grunt.file.isFile(file)) {
						return false;
					} else {
						return true;
					}
				}).map(function (file) {
					return grunt.file.read(file);
				}).join(options.separator); // concating using seprator provided in the options 
				
				if (destTrack.indexOf(outfile) > -1) {
					fs.appendFileSync(path.resolve(outfile), options.separator + outStr);
				} else {
					grunt.file.write(outfile, grunt.template.process(options.banner) +  outStr);
					destTrack.push(outfile);
				}

			});
		});
		// Print a success message.
		grunt.log.writeln('-> ' + destTrack.length + ' concatenated file(s) created.');
	});
};