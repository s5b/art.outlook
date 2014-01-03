module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['build'],

        watch: {
            html: {
                files: ['app/*.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['app/js/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                plusplus: true,
                quotmark: 'single',
                white: true,
                //unused: true,
                strict: true
            },
            all: ['app/js/*.js']
        },

        uglify: {
            build: {
                files: {
                    'build/js/app.min.js': ['app/js/*.js']
                }
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['app/*.html']
            }
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    'build/css/app.css': 'build/css/app.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/css/app.css',
                dest: 'build/css/app.css'
            }
        },

        sass: {
            build: {
                files: {
                    'build/css/app.css': 'assets/sass/app.scss'
                }
            }
        },

        jekyll: {
            options: {
                src: '<%= app %>'
            },
            dist: {
                options: {
                    dest: '<%- dist %>',
                    config: '_config.yaml'
                }
            },
            serve: {
                options: {
                    dest: 'conga',
                    drafts: true
                }
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, cwd: './app/', src: ['**/*.html'], dest: 'build/' },
                    { expand: true, cwd: './assets/css/', src: ['**'], dest: 'build/css' },
                    { expand: true, cwd: './app/lib/angular/', src: ['angular.js', 'angular-route.js'], dest: 'build/lib/angular' }
                ]
            }
        }

    });

    grunt.registerTask('default', []);

    grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);

};
