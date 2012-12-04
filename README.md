[Grunt][grunt] plugin for replacing (or removing) references to non-optimized scripts or stylesheets on HTML files.

## Getting Started

Install this grunt plugin next to your project's gruntfile with: `npm install grunt-htmlrefs`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-htmlrefs');
```

Then specify your config:

```javascript
  grunt.initConfig({
    htmlrefs: {
      dist: {
        /** @required  - string including grunt glob variables */
        src: './static/views/**/*.html',
        /** @optional  - string directory name*/
        dest: './dist/static/views/',
        /** @optional  - references external files to be included */
        includes: {
            analytics: './ga.inc' // in this case it's google analytics (see sample below)
        },
        /** any other parameter included on the options will be passed for template evaluation */
        options: {
          buildNumber: 47878,
        }
      }
    }
  });
```

Using the configuration above, consider the following example html to see it in action:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mural.ly</title>
    <!-- build:css /static/css/compiled.<%= buildNumber %>.css -->
    <link rel="stylesheet" type="text/css" href="/static/css/development.css" />
    <!-- endbuild -->
</head>
<body id="landing-page">
    <!-- build:js /static/js/compiled/murally.js -->
    <script type="text/javascript" src="/static/js/compiled/external.js"></script>
    <script type="text/javascript" src="/static/js/onefile.js"></script>
    <script type="text/javascript" src="/static/js/other_file.js"></script>
    <!-- endbuild -->
    <!-- build:remove -->
    <script type="text/javascript" src="/static/js/not-for-compiler.js?v=1355D6D2D38"></script>
    <!-- endbuild -->

    <script>
      bootstrapLandingPage();
    </script>

    <!-- build:include analytics -->
    <!-- endbuild -->
</body>
</html>
```

After running the grunt task it will be stored on the dist folder as

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mural.ly</title>
    <link rel="stylesheet" type="text/css" href="/static/css/compiled.47878.css" />
</head>
<body id="landing-page">
    <script type="text/javascript" src="/static/js/compiled/murally.js"></script>

    <script>
      bootstrapLandingPage();
    </script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>
```

There 4 types of replacements: css, js, include and remove (it will erase the whole block).

[grunt]: https://github.com/cowboy/grunt

## Release History
* 0.2.0 Added support for includes
* 0.1.0 Initial Release
