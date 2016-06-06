// # Install Karma:
// $ npm install karma --save-dev

// # Install plugins that your project needs:
// $ npm install karma-jasmine karma-chrome-launcher --save-dev

module.exports = function(config) {
    config.set({

        basePath: '../',
        /*好像号单个引入angularjs的文件才能生效，压缩后的文件不行
        会出现的错误：anglar is not defined*/
        files: [
            // "dist/js/*.js",
            "test/unit/*.js"
        ],

        autoWatch: true,

        frameworks: ['jasmine', "jasmine-jquery"],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
