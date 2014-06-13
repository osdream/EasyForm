exports.input = __dirname;

var fs = require('fs');
var path = require( 'path' );
exports.output = path.resolve( __dirname, 'dist' );

var packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
);
// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';
var styleInlineProcessor = {
    name: 'StyleInlineProcessor',
    files: ['src/EasyForm.js'],
    mainCss: 'src/css/main.less',
    process: function(file, processContext, callback) {
        var mainCssFile = processContext.getFileByPath(this.mainCss);
        try {
            file.setData(file.data.replace(/.%STYLE_CONTENT%./g, JSON.stringify(mainCssFile.data)));
        }
        catch (e) {
            this.log.fatal('Rewrite STYLE_CONTENT failed, file = [%s], msg = [%s]',
                file.path, e.toString());
        }

        callback();
    }
};

var keepNecessaryFile = {
    name: 'KeepNecessaryFile',
    files: ['*', '.*'],
    keep: ['src/EasyForm.js'],
    process: function(file, processContext, callback) {
        var keep = this.keep.map(function(item) {
            return processContext.getFileByPath(item)
        });
        if (keep.indexOf(file) == -1) {
            processContext.removeFile(file.path);
        }
        else {
            file.outputPath = file.outputPath.replace(/\.js/g, '-' + packageJson['version'] + '.min.js');
        }

        callback();
    }
};

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler();
    var cssProcessor = new CssCompressor({
        files: ['src/css/main.less'],
        compressOptions: {
            keepBreaks: false
        }
    });
    var moduleProcessor = new ModuleCompiler();
    var jsProcessor = new JsCompressor({
        files: ['src/EasyForm.js']
    });
    var pathMapperProcessor = new PathMapper({
        from: 'src',
        to: '.'
    });
    var addCopyright = new AddCopyright();

    return {
        'default': [ lessProcessor, moduleProcessor, pathMapperProcessor ],
        'release': [
            lessProcessor, cssProcessor, moduleProcessor,
            jsProcessor, styleInlineProcessor, keepNecessaryFile,
            pathMapperProcessor, addCopyright
        ]
    };
};

exports.exclude = [
    'tool',
    'doc',
    'test',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

