module.exports = function (grunt) {
  var format = function(str, data) {
    return str.replace(/{([^{}]+)}/g, function(match, val) {
      var prop = data;
      val.split('.').forEach(function(key) {
        prop = prop[key];
      });

      return prop;
    });
  };

  String.prototype.format = function(data) {
    return format(this, data);
  };

  var srcFolder         = 'src';
  var nodeModulesFolder = 'node_modules';
  var libFolder         = '{0}/lib'.format([srcFolder]);
  var wwwFolder         = 'www';
  var srcJsFolder       = '{0}/js'.format([srcFolder]);
  var wwwJsFolder       = '{0}/js'.format([wwwFolder]);
  var wwwFontsFolder    = '{0}/fonts'.format([wwwFolder]);
  var srcSassFolder     = '{0}/sass'.format([srcFolder]);
  var wwwCssFolder      = '{0}/css'.format([wwwFolder]);
  var wwwExtraCssFolder = '{0}/extras'.format([wwwCssFolder]);
  var srcImgFolder      = '{0}/img'.format([srcFolder]);
  var wwwImgFolder      = '{0}/img'.format([wwwFolder]);
  var srcTemplateFolder = '{0}/templates'.format([srcFolder]);
  var wwwTemplateFolder = '{0}/templates'.format([wwwFolder]);

  var componentsFile    = '{0}/componentes.js'.format([wwwJsFolder]);
  var appFile           = '{0}/app.js'.format([wwwJsFolder]);
  var cssFile           = '{0}/style.css'.format([wwwCssFolder]);
  var minComponentsFile = '{0}/componentes.min.js'.format([wwwJsFolder]);
  var minAppFile        = '{0}/app.min.js'.format([wwwJsFolder]);
  var serverPort        = 3102;
  var liveReload        = 32701;
  var serverHost        = "localhost";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      static: {
        src: ['{0}/**/*.*'.format([wwwFolder])]
      },
      concated: {
        src: [componentsFile, appFile]
      }
    },

    compass: {
      app: {
        options: {
          config: 'config.rb'
        }
      }
    },

    copy: {
      fonts: {
        files: [
          {expand: true, cwd: libFolder, src: ['**/fontawesome/fonts/*'], flatten: true, dest: wwwFontsFolder},
          {expand: true, cwd: libFolder, src: ['**/bootstrap-sass/assets/fonts/bootstrap/*'], flatten: true, dest: '{0}/bootstrap'.format([wwwFontsFolder])}
        ]
      },
      css: {
        files: [
          {expand: true, cwd: '{0}/sweetalert2/dist'.format([libFolder]), src: ['sweetalert2.css'], flatten: true, dest: wwwExtraCssFolder},
          {expand: true, cwd: '{0}/openlayers'.format([libFolder]), src: ['ol.css'], flatten: true, dest: wwwExtraCssFolder}
        ]
      },
      img: {
        files: [
          {expand: true, cwd: srcImgFolder, src: ['**/*.*'], dest: wwwImgFolder}
        ]
      },
      html: {
        files: [
          {expand: true, cwd: srcFolder, src: ['index.html'], dest: wwwFolder},
          {expand: true, cwd: srcTemplateFolder, src: ['**/*.*'], dest: wwwTemplateFolder}
        ]
      }
    },

    concat: {
      options: {},
      componentes: {
        src: [
          "src/lib/moment/moment.js",
          "src/lib/moment/locale/pt-br.js",
          "src/lib/sweetalert2/dist/sweetalert2.js",
          "src/lib/lodash/dist/lodash.js",
          "src/lib/jquery/dist/jquery.js",
          "src/lib/bootstrap-sass/assets/javascripts/bootstrap.js",

          "src/lib/angular/angular.js",
          "src/lib/angular-sanitize/angular-sanitize.js",
          "src/lib/angular-ui-router/release/angular-ui-router.js",
          "src/lib/angular-resource/angular-resource.js",
          "src/lib/angular-sweetalert-2/SweetAlert.js",
          "src/lib/angular-cookies/angular-cookies.js",
          "src/lib/openlayers/ol.js"
        ],
        dest: componentsFile
      },
      app: {
        src: [
          "{0}/**/*.js".format([srcJsFolder])
        ],
        dest: appFile
      }
    },

    injector: {
      options: {
        ignorePath: [wwwFolder]
      },
      dev: {
        files: {
          'www/index.html': [
            componentsFile,
            appFile,
            '{0}/*.css'.format([wwwExtraCssFolder]),
            cssFile
          ]
        }
      },
      prod: {
        files: {
          'www/index.html': [
            minComponentsFile,
            minAppFile,
            '{0}/*.css'.format([wwwExtraCssFolder]),
            cssFile
          ]
        }
      }
    },

    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'liveReload',
              replacement: '<script src="//localhost:{0}/livereload.js"></script>'.format([liveReload])
            },
            {
              match: 'backendURL',
              replacement: '<%= grunt.file.readJSON("config/development.json").backendURL %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['www/index.html'], dest: 'www/'},
          {expand: true, flatten: true, src: ['www/js/app.js'], dest: 'www/js/'}
        ]
      },
      sandbox: {
        options: {
          patterns: [
            {
              match: 'liveReload',
              replacement: ''
            },
            {
              match: 'backendURL',
              replacement: '<%= grunt.file.readJSON("config/sandbox.json").backendURL %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['www/index.html'], dest: 'www/'},
          {expand: true, flatten: true, src: ['www/js/app.js'], dest: 'www/js/'}
        ]
      },
      staging: {
        options: {
          patterns: [
            {
              match: 'liveReload',
              replacement: ''
            },
            {
              match: 'backendURL',
              replacement: '<%= grunt.file.readJSON("config/staging.json").backendURL %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['www/index.html'], dest: 'www/'},
          {expand: true, flatten: true, src: ['www/js/app.js'], dest: 'www/js/'}
        ]
      },
      prod: {
        options: {
          patterns: [
            {
              match: 'liveReload',
              replacement: ''
            },
            {
              match: 'backendURL',
              replacement: '<%= grunt.file.readJSON("config/production.json").backendURL %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['www/index.html'], dest: 'www/'},
          {expand: true, flatten: true, src: ['www/js/app.js'], dest: 'www/js/'}
        ]
      }
    },

    uglify: {
      options: {},
      componentes: {
        files: {
          'www/js/componentes.min.js': [componentsFile]
        }
      },
      app: {
        files: {
          'www/js/app.min.js': [appFile]
        }
      }
    },

    connect: {
      all: {
        options:{
          port: serverPort,
          hostname: serverHost,
          base: wwwFolder
        }
      }
    },

    open: {
      all: {
        path: 'http://{0}:{1}'.format([serverHost, serverPort])
      }
    },

    watch: {
      options: {
        livereload: liveReload
      },
      app: {
        files: "{0}/**/*.js".format([srcJsFolder]),
        tasks: ['concat:app', 'injector:dev', 'replace:dev']
      },
      html: {
        files: ['{0}/index.html'.format([srcFolder]), '{0}/**/*.html'.format([srcTemplateFolder])],
        tasks: ['copy:html', 'injector:dev', 'replace:dev']
      },
      images: {
        files: '{0}/**/*.*'.format([srcImgFolder]),
        tasks: ['copy:img']
      },
      css: {
        files: '{0}/**/*.scss'.format([srcSassFolder]),
        tasks: ['compass:app', 'injector:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('api', ['clean:static', 'compass', 'copy', 'concat', 'injector:dev', 'replace:dev', 'watch']);
  grunt.registerTask('iframe', ['clean:static', 'compass', 'copy', 'concat', 'injector:dev', 'replace:dev', 'connect', 'watch']);
  grunt.registerTask('dev', ['clean:static', 'compass', 'copy', 'concat', 'injector:dev', 'replace:dev', 'connect', 'open', 'watch']);
  grunt.registerTask('sandbox', ['clean:static', 'compass', 'copy', 'concat', 'replace:sandbox', 'injector:dev']);
  grunt.registerTask('staging', ['clean:static', 'compass', 'copy', 'concat', 'replace:staging', 'injector:dev']);
  grunt.registerTask('staging-noug', ['clean:static', 'compass', 'copy', 'concat', 'replace:staging', 'injector:dev']);
  grunt.registerTask('production', ['clean:static', 'compass', 'copy', 'concat', 'replace:prod', 'uglify', 'injector:prod', 'clean:concated']);
  grunt.registerTask('pro-ugl', ['clean:static', 'compass', 'copy', 'concat', 'replace:prod', 'injector:dev']);
};
