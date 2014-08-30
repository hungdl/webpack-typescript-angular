"use strict";

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
        clean: {
            all: ['src/**/*.js', 'build']
        },
        typescript: {
            build: {
                src: ['src/**/*.ts'],
                dest: 'src',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    basePath: 'src'
                }
            }
        },
        replace: {
            build: {
                src: ['src/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: 'resourceRequire',
                    to: 'require'
                }]
            }
        },
        webpack: {
            static: {
                entry: "./src/mandrill-public-root.js",
                output: {
                    filename: "build/build.js"
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'typescript', 'replace', 'webpack'])
};
