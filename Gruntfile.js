module.exports = function(grunt) {
	var mozjpeg = require('imagemin-mozjpeg');
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Uglify
		uglify: {
			build: {
				src: 'js/script.js',
				dest: 'js/script.min.js'
			}
		},
		// Image minify
		imagemin: {
			static: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{removeViewBox: false}],
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
					dest: 'dist/'
				}]
			}
		},
		// Watch
		watch: {
			all: {
				files: ['sass/style.scss', 'css/style.css', 'js/script.js'],
				tasks: ['sass', 'csslint', 'jshint']
			}
		},
		// Sass
		sass: {                              // Task
    		dist: {                            // Target
    			options: {                       // Target options
    				style: 'expanded'
    			},
    			files: {                         // Dictionary of files
    				'css/style.css': 'sass/style.scss'    // 'destination': 'source'
		
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
			all: ['Gruntfile.js', 'js/*.js']
		}
	// Html Validator
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	

	// grunt.registerTask('default', ['csslint', 'jshint']);
	// grunt.registerTask('default', ['validation']);
	grunt.registerTask('ugly', ['uglify']);
	grunt.registerTask('default', ['imagemin']);
	grunt.registerTask('default', ['watch']);
};