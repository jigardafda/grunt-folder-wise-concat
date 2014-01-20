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
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `'\n'` (new line)

A string value that is used to do something with whatever.

### Usage Examples

#### Default Options
In this example, the default options are used to do folder wise concatination. So if the `src/folderPath` folder has the files named `Testing` and `123` file had the content `1 2 3` , the generated result would be `Testing, 1 2 3` in `dest/default_options` file.

###### input folder structure:
```
	src
		|__folderPath
					|_ Testing
					|_ 123
```

```js
grunt.initConfig({
  folderWiseConcat: {
    options: {},
    folders: {
      'dest/default_options': ['src/folderPath']
    }
  }
});
```

#### Custom Options

```js
grunt.initConfig({
  folderWiseConcat: {
    options: {
      separator: ' '
    },
    files: {
      'dest/default_options': ['src/folderPath']
    }
  }
});
```

## Release History
_(Nothing yet)_