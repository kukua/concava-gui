module.exports = function (grunt) {
	grunt.initConfig({
		browserify: {
			watchMain: {
				options: {
					browserifyOptions: {
						debug: true,
					},
					transform: [
						['babelify', { presets: ['es2015', 'react'] }]
					],
					watch: true,
					keepAlive: true,
				},
				files: {
					'build/js/main.js': 'src/js/main.js',
				},
			},
			main: {
				options: {
					browserifyOptions: {
						debug: true,
					},
					transform: [
						['babelify', { presets: ['es2015', 'react'] }]
					],
				},
				files: {
					'build/js/main.js': 'src/js/main.js',
				},
			},
		},
		copy: {
			assets: {
				files: [
					{ expand: false, filter: 'isFile', src: ['./src/www/index.html'], dest: './build/index.html' },
				],
			},
		},
	})

	require('load-grunt-tasks')(grunt)

	grunt.registerTask('default', ['watch'])
	grunt.registerTask('watch', ['browserify:watchMain'])
	grunt.registerTask('build', ['copy:assets', 'browserify:main'])
}
