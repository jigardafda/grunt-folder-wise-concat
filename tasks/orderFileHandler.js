/*global module,require*/
var path = require('path');

/*
 * Class to handle order file expanding
 * @param orderfilepath :  {string} : path of order file
 * @param grunt
 */
function OrderFile(orderfilepath, grunt) {
	this.filePath = path.normalize(orderfilepath);
	this.orderFileName = path.basename(this.filePath);
	this.conf = grunt.file.readJSON(this.filePath);
	this.curDir = path.dirname(this.filePath);
	this.grunt = grunt;
}

/*
 * function to validate order file it must contain files list to be concatenated
 */
OrderFile.prototype.validate = function () {
	return this.conf && this.files;
};


/*
 * function to expand all the files present in order json file
 * and adds them to final array , ignoring order file
 */
OrderFile.prototype.expand = function () {
	var scope = this,
		files = scope.conf.files;
	scope.outArray = [];
	files.forEach(function (efile) {
		var expandedFiles = scope.grunt.file.expand(path.join(scope.curDir, efile));
		expandedFiles.forEach(function (filepath) {
			if (path.basename(filepath) !== scope.orderFileName) { // Ignoring orderfile 
				scope.outArray.push(filepath);
			}
		});
	});
};

/*
 * returns final expanded files's array
 */
OrderFile.prototype.getFilesList = function () {
	this.validate();
	this.expand();
	return this.outArray;
};

/*
 * returns output file path from order file
 */
OrderFile.prototype.getOutputFilePath = function () {
	return this.conf.outputFile;
};

/*
 *
 */
OrderFile.prototype.getOuputFilePath = function () {
	return this.conf;
};

module.exports.getInst = function (orderfilepath, grunt) {
	return new OrderFile(orderfilepath, grunt);
};