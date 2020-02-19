module.exports = function(grunt) {

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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	

	// grunt.registerTask('default', ['csslint', 'jshint']);
	// grunt.registerTask('default', ['validation']);
	grunt.registerTask('ugly', ['uglify']);
	grunt.registerTask('default', ['watch']);
};