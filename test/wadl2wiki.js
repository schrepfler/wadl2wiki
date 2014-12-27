var should = require('chai').should(),
    wadl2wiki = require('../lib/wadl2wiki.js');

describe('#handlebarsHelpers', function() {

  var helpers = wadl2wiki.handlebars.helpers; 
  
  it('escapes { ', function() {
    helpers.wikisafe('{').should.equal('\\{');
  });

  it('escapes } ', function() {
    helpers.wikisafe('}').should.equal('\\}');
  });

  
});