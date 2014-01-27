/*jshint node:true*/
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlrefs: {
			dist: {
				files: [{
					expand: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist/'
				}],
				options: {
					includes: {
						analytics: './ga.inc',
					},
					buildNumber: 349
				}
			}
		}
	});


	grunt.loadTasks('tasks');
};
