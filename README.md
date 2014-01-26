# grunt-folderWiseConcat

> Grunt plug-in to concatenate files folder wise.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-folderWiseConcat --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-folderWiseConcat');
```

## The "folderWiseConcat" task

### Overview
In your project's Gruntfile, add a section named `folderWiseConcat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  folderWiseConcat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific folder's lists here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `'\n'` (new line)

A string value used to do concat two files.

#### options.orderFileName
Type: `String`
Deafult value: `__order.json`

To give order file name other then `__order.json`.

#### options.autoConcatAll
Type: `Boolean`
Deafult value: `true`

If `false`, only folder with order file will be processed.  

#### options.banner
Type: `String` 
Default: empty string

This string will be prepended to the beginning of the concatenated output. It is processed using grunt.template.process, using the default options.


### Order file structure
Order file must contain array property named `files`.
If `outputFile` property is provided, it will override grunt configuration destination path and will create file at `outputFile` path. 
Directories which don't have order file will get concatenated in grunt configuration's destination file only.
```
{
	outputFile='../../output.txt',
	files=[
		'file1',
		'file2'
	]
}
```

### Usage Examples

###### Folder Structure:
```
  test								 Content of Files
    |   
	+---MultiLevel
	|   +---data
	|   |       data1.txt				// data 1
	|   |       data2.txt				// data 2
	|   |       
	|   +---orderfile
	|   |       facebook.txt			// facebook
	|   |       google.txt			    // google
	|   |       twitter.txt			    // twitter
	|   |       __order.json		 	// { outputFile='../../' ,
	|   |								//	 files=
	|   |								//		[
	|   |								//			'facebook.txt',
	|   |								//			'google.txt'
	|   |								//		]
	|   |								//	}
	|   |       
	|   \---simple
	|       |   simple1.txt				// simple text 1
	|       |   simple2.txt				// simple text 2
	|		|
	|		\---Level2
	|				level2-1.txt		//  level2-1
	|				level2-2.txt		//  level2-2
	|
	+---OrderFile
	|       f1.txt						// f1
	|       f2.txt						// f2
	|       f3.txt						// f3
	|       facebook.txt				// facebook
	|       google.txt    				// google
	|       twitter.txt   				// twitter
	|       __order.json				// {
	|									//	files=
	|									//		[
	|									//			'f*',
	|									//			'google.txt'
	|									//		]
	|									//	}
	|       
	\---SimpleConc
			simple1.txt  				// simple 1
			simple2.txt  				// simple 2
```

#### Simple Concatination
Grunt task for a folder concatination.
```js
grunt.initConfig({
  folderWiseConcat: {
    SimpleConc: {
		files: {
			'test/SimpleConc.js': ['test/SimpleConc']
		}
	}
});
```

#### Concatination with Order File
Concatination with order file
```js
grunt.initConfig({
  folderWiseConcat: {
    OrderFile: {
		files: {
			'test/OrderFile.js': ['test/OrderFile']
		}
	}
  }
});
```
Output file
```
	test
	|
	+---OrderFile.js		// 	f1
							//	f2
							//	f3
							//	facebook
							//	google
```

#### Multilevel folder concatination 
Concatination with order file of
```js
grunt.initConfig({
  folderWiseConcat: {
    MultiLevel: {
		files: {
			'test/MultiLevel.js': ['test/MultiLevel/**/*']
		}
	}
  }
});
```
Output files
```
	test
    |
	+--- MultiLevel.js			//  data1
	|							//  data2
	|							//  simple text 1
	|							//  simple text 2
	|							//  level2-1
	|							//  level2-2	
	|						
    +--- orderFileExp.txt		//  google
								//	facebook
```

## Release History

##### Version 0.3.0 -(27/01/2013):
added support mutilevel concatination.
added support for autoConcatAll, banner & orderFileName options.
	
##### Version 0.2.0 -(25/01/2013):
`__order.json` file support added.
	
##### Version 0.1.0 -(20/01/2013):
initial release.