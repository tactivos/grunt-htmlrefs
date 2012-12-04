/*
 * grunt-htmlrefs
 * https://github.com/tactivos/grunt-htmlrefs
 *
 *	Part of this work (the expression at least) is inspired
 *	on what YEOMAN (http://github.com/yeoman) does. However
 *	we chose a simplest path (of replacing/removing only) without
 *	going through the full work of replacing and merging stuff.
 *
 * Copyright (c) 2012 Johnny G. Halife & Mural.ly Dev Team
 */
module.exports = function (grunt) {
	var _ = grunt.utils._;

	var path = require('path');

	// start build pattern --> <!-- build:[target] output -->
	var regbuild = /<!--\s*build:(\w+)\s*(.+)\s*-->/;

	// end build pattern -- <!-- endbuild -->
	var regend = /<!--\s*endbuild\s*-->/;

	// <script> template
	var scriptTemplate = '<script type="text/javascript" src="<%= dest %>"></script>';

	// stylesheet template
	var stylesheetTemplate = '<link rel="stylesheet" type="text/css" href="<%= dest %>">';

	grunt.registerMultiTask('htmlrefs', "Replaces (or removes) references to non-optimized scripts or stylesheets on HTML files", function () {
		var params = (this.data.options || {});
		var includes = (this.data.includes || {});
		var pkg = (grunt.config.get().pkg || {});
		var files = grunt.file.expandFiles(this.file.src);
		var dest = this.file.dest;

		files.map(grunt.file.read).forEach(function (content, i) {
			content = content.toString(); // make sure it's a string and not buffer
			var blocks = getBlocks(content);
			var file = files[i];

			// Determine the linefeed from the content
			var lf = /\r\n/g.test(content) ? '\r\n' : '\n';

			blocks.forEach(function (block) {
				// Determine the indent from the content
				var raw = block.raw.join(lf);
				var options = _.extend({}, { pkg: pkg }, block, params);

				var replacement = grunt.helper('htmlrefs:template:' + block.type, options, lf, includes);
				content = content.replace(raw, replacement);
			});

			// write the contents to destination
			var filePath = dest ? path.join(dest, path.basename(file)) : file;
			grunt.file.write(filePath, content);
		});
	});

	grunt.registerHelper('htmlrefs:template:js', function (block) {
		var indent = (block.raw[0].match(/^\s*/) || [])[0];
		return indent + grunt.template.process(scriptTemplate, block);
	});

	grunt.registerHelper('htmlrefs:template:css', function (block) {
		var indent = (block.raw[0].match(/^\s*/) || [])[0];
		return indent + grunt.template.process(stylesheetTemplate, block);
	});

	grunt.registerHelper('htmlrefs:template:include', function (block, lf, includes) {
		// let's see if we have that include listed
		if(!includes[block.dest]) return '';

		var indent = (block.raw[0].match(/^\s*/) || [])[0];
		var lines = grunt.file.read(includes[block.dest]).replace(/\r\n/g, '\n').split(/\n/).map(function(l) {return indent + l});

		return lines.join(lf);
	});

	grunt.registerHelper('htmlrefs:template:remove', function (block) {
		return ''; // removes replaces with nothing
	});

	function getBlocks(body) {
		var lines = body.replace(/\r\n/g, '\n').split(/\n/),
			block = false,
			sections = {},
			last;

		lines.forEach(function (l) {
			var build = l.match(regbuild),
				endbuild = regend.test(l);

			if(build) {
				block = true;
				sections[[build[1], build[2].trim()].join(':')] = last = [];
			}

			// switch back block flag when endbuild
			if(block && endbuild) {
				last.push(l);
				block = false;
			}

			if(block && last) {
				last.push(l);
			}
		});

		var blocks = [];

		for(s in sections) {
			blocks.push(fromSectionToBlock(s, sections[s]));
		}

		return blocks;
	};

	function fromSectionToBlock(key, section) {
		var chunks = key.split(':');

		return {
			type: chunks[0],
			dest: chunks[1],
			raw: section
		};
	};
};
