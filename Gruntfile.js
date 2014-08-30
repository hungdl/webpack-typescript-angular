"use strict";

/**
 * Looks like Typescript API (both CLI and in node) has quite a few quirks so that it can't be used without a good wrapper
 * for complex build scenarios like we have (live reload, minification, amd etc).
 * As of 06.2014 there are no good gulp typescript tasks on github.
 * But there is a very good one for Grunt https://github.com/k-maru/grunt-typescript
 *
 * Advantages of it are:
 * - included watch task that deals with caching
 * - no temporary directories garbage in source folders (like gulp-tsc did)
 * - windows and mac support (some tsc CLI wrappers hit the limitation)
 * - faster build time (1.5 vs 3 seconds in favor of Grunt task for one file build)
 *
 * It would be better not to use grunt and gulp in a crazy mix.
 * Use it sparingly.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        typescript: {
            build: {
                src: ['src/mandrill-public-root.ts'],
                dest: '.tmp',
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'src'
                }
            }
        },
        replace: {
            build: {
                src: ['.tmp/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: 'resourceRequire',
                    to: 'require'
                }]
            }
        },
        copy: {
            assets: {
                files: [
                    // includes files within path
                    {expand: true, src: ['**', '!**/*.ts'], dest: '.tmp/', cwd: 'src', filter: 'isFile'}
                ]
            }
        },
        clean: {
            all: ['build', '.tmp']
        }
    });

    grunt.registerTask('default', ['clean', 'copy', 'typescript', 'replace'])
};