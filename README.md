[Grunt][grunt] plugin for replacing (or removing) references to non-optimized scripts or stylesheets on HTML files.

## Getting Started

Install this grunt plugin next to your project's gruntfile with: `npm install grunt-htmlrefs --save-dev`

Then add this line to your project's `Gruntfile.js` :

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
        options: {
          /** @optional  - references external files to be included */
          includes: {
            analytics: './ga.inc' // in this case it's google analytics (see sample below)
          },
          /** any other parameter included on the options will be passed for template evaluation */
          buildNumber: 47878
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
    <!-- ref:css /static/css/compiled.<%= buildNumber %>.css -->
    <link rel="stylesheet" type="text/css" href="/static/css/development.css" />
    <!-- endref -->
    <!-- ref:inlinecss /static/css/compiled.css -->
    <link rel="stylesheet" type="text/css" href="/static/css/development.css" />
    <!-- endref -->
</head>
<body id="landing-page">
    <!-- ref:js /static/js/compiled/murally.js -->
    <script type="text/javascript" src="/static/js/compiled/external.js"></script>
    <script type="text/javascript" src="/static/js/onefile.js"></script>
    <script type="text/javascript" src="/static/js/other_file.js"></script>
    <!-- endref -->
    <!-- ref:remove -->
    <script type="text/javascript" src="/static/js/not-for-compiler.js?v=1355D6D2D38"></script>
    <!-- endref -->

    <script>
      bootstrapLandingPage();
    </script>

    <!-- ref:include analytics -->
    <!-- endref -->
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
    <style> ... CSS from /static/css/compiled.css ... </style>
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

There 4 types of replacements: css, inlinecss, js, include and remove (it will erase the whole block).

[grunt]: https://github.com/cowboy/grunt

## Release History
* 0.4.0 Support Grunt 0.4
* 0.2.2 BUGFIX: Multiple `remove` sections (thanks @trongthanh)
* 0.2.0 Added support for includesu
* 0.1.0 Initial Release

### License

The MIT License (MIT)

Copyright (c) 2013 Johnny G Halife

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

        
