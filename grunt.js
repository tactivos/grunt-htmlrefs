module.exports = function (grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',
		htmlrefs: {
			dist: {
				src: './*.html',
				dest: './dist/static/',
				options: {
					buildNumber : 349
				}
			}
		}
	});

	grunt.loadTasks('tasks');
};
