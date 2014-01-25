/*global module,p*/
var path = require('path')
/*
 * Class to handle order file expanding 
 */
function OrderFile(orderfilepath, grunt) {
	this.filePath = path.normalize(orderfilepath);
	this.conf = grunt.file.readJSON(this.filePath);
	this.curDir = path.dirname(this.filePath);
	this.grunt = grunt;
}


OrderFile.prototype.validate = function () {
	return this.conf && this.files;
};

OrderFile.prototype.expand = function () {
	var i, files = this.conf.files, tmp;
	this.outArray = [];
	for (i = 0; i < files.length; i = i + 1) {
		tmp = this.grunt.file.expand(path.join(this.curDir, files[i]));
		this.outArray = this.outArray.concat(tmp);
	}
};

OrderFile.prototype.getFilesList =  function () {
	this.validate();
	this.expand();
	return this.outArray;
};


module.exports.getInst =  function (orderfilepath, grunt) {
	return new OrderFile(orderfilepath, grunt);
};
