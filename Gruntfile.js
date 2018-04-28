module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            },
        },
        clean: [
            './dist/**'
        ],
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**', '!**/*.ts'],
                        dest: './dist/'
                    }, {
                        expand: true,
                        cwd: 'node_modules/requirejs',
                        src: ['require.js'],
                        dest: './dist/scripts'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/three/build',
                        src: ['three.js'],
                        dest: './dist/scripts'
                    },
                ],
            }
        },
        jshint: {
            files: ['./Gruntfile.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: './dist/',
                    open: {
                        target: 'http://localhost:3000'
                    }
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', './src/**'],
            tasks: ['jshint', 'clean', 'ts', 'copy'],
            options: {
                livereload: true,
            }
        }
    });
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'clean', 'ts', 'copy', 'connect', 'watch']);
};