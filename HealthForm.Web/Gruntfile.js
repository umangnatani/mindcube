/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({

        copy: {
            build: {
                cwd: 'Scripts/Vendors',
                src: ['**/*min.js'],
                dest: 'assets/js',
                expand: true,
                flatten: true,
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};