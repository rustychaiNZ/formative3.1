module.exports = function(grunt) {
	var mozjpeg = require('imagemin-mozjpeg');
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Uglify js
		uglify: {
			build: {
				src: 'js/script.js',
				dest: 'js/script.min.js'
			}
		},
		// Ugly css min
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css', '!*.min.css'],
					dest: 'css/',
					ext: '.min.css'
				}]
			}
		},
		// Image minify
		imagemin: {
			static: {
				options: {
					optimizationLevel: 3,
					// svgoPlugins: [{removeViewBox: false}],
					// use: [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()] // Example plugin usage
					use: [mozjpeg()]
				},
				files: {
					'dist/img.png': 'src/img.png', 
					'dist/img.jpg': 'src/img.jpg', 
					'dist/img.gif': 'src/img.gif'
				}
			},
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['assets/*.{png,jpg,gif}'],
					dest: 'assets/minifiedImages'
				}]
			}
		},
		// Watch
		watch: {
			all: {
				files: ['sass/style.scss', 'css/style.css', 'js/script.js'],
				tasks: ['sass', 'csslint', 'jshint', 'cssmin', 'uglify']
			}
		},
		// Html validation
		// validation: {
			// options: {
				// reset: grunt.option('reset') || false,
				// stoponerror: false,
				// remotePath: 'http://decodize.com/',
				// remoteFiles: ['html/moving-from-wordpress-to-octopress/', 'css/site-preloading-methods/'], //or
				// remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
				// relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'] //ignores these errors
			// },
			// files: {
				// src: ['index.html']
			// }
		// },
		// Sass
		sass: {                              // Task
    		dist: {                            // Target
    			options: {                       // Target options
    				style: 'expanded'
    			},
    			files: {                         // Dictionary of files
    				'css/style.css' : 'sass/style.scss'    // 'destination' : 'source'
    			}
    		}
    	},
		// Controls css lint 
		csslint: {
			lax: {
			  	options: {
			  		import: false,
			  		'order-alphabetical' : false
			  	},
			  	src: ['css/*.css', '!*.min.css']
			},
		},
		// Js Hint
		jshint: {
			files: ['!Gruntfile.js', 'js/script.js', '!script.min.js'],
			options: {
            // options here to override JSHint defaults
            	globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
            	},
			laxcomma: true,
			esversion : 6
			}	
		}
	// Html Validator
	});

	// Loading grunt tasks
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	

	// Register grunt tasks
	grunt.registerTask('ugly', ['uglify']);
	// grunt.registerTask('default', ['validation']);
	grunt.registerTask('imgMin', ['imagemin']);
	grunt.registerTask('default', ['watch']);
};