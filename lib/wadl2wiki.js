'use strict';

var wadl2json = require('wadl2json');
var handlebars = require('handlebars');
var program = require('commander');
var fs = require('fs');
var _ = require("lodash");

// Escape curly braces
handlebars.registerHelper('wikisafe', function(origStr) {
    var newStr = origStr.replace(/([*+?^=!${}])/g, "\\$1");
    //newStr = newStr.replace('}',"\\" + "}"); 
    return newStr; 
});

// Convert booleans into Tick and Cross emote
handlebars.registerHelper('emote', function(origBool) {
    var newStr; 
    if(origBool == true) {
        newStr = '(/)';
    }
    if(origBool == false) {
        newStr = '(x)';
    }


    return newStr; 
});

function _render(wadl, options, onSuccess) {
    //wadl2json.options = options;

    // Register handlebar partials
    for (var partialName in options.partials) {
        if (options.partials.hasOwnProperty(partialName)) {
            handlebars.registerPartial(partialName, options.partials[partialName]);
        }
    }

    var apiDescriptorMap = new Object();
    apiDescriptorMap.resources = _.pairs(wadl);
    apiDescriptorMap.baseUri = "http://localhost";

    var result = options.template(apiDescriptorMap);
    onSuccess(result);
}

function parseWithOptions(source, options, onSuccess, onError) {
    //raml2obj.parse(source, function(wadl2json) {
      //  _render(wadl2json, config, onSuccess);
    //});
    var wadl = wadl2json.fromFile(source, options);
    _render(wadl, options, onSuccess);
}

function parse(source, onSuccess, onError) {
    var options = {
        'template': require('./template.handlebars'),
        'partials': {
            'resource': require('./resource.handlebars')
        }
    };

    parseWithOptions(source, options, onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [WADL input file]')
        .option('-i, --input [input]', 'WADL input file')
        .option('-o, --output [output]', 'Wiki Markup output file')
        .parse(process.argv);

    var input = program.input;

    if (!input) {
        if (program.args.length !== 1) {
            console.error('Error: You need to specify the WADL input file');
            program.help();
            process.exit(1);
        }

        input = program.args[0];
    }

    // Start the parsing process
    parse(input, function(result) {
        if (program.output) {
            fs.writeFileSync(program.output, result);
        } else {
            // Simply output to console
            process.stdout.write(result);
            process.exit(0);
        }
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}


module.exports.parse = parse;
module.exports.parseWithOptions = parseWithOptions;
module.exports.handlebars = handlebars; 