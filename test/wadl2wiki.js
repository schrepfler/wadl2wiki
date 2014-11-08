var should = require('chai').should(),
    wadl2wiki = require('../lib/wadl2wiki');

describe('#handlebarsHelpers', function() {

  var helpers = raml2wiki.handlebars.helpers; 
  
  it('escapes { ', function() {
    helpers.wikisafe('{').should.equal('\\{');
  });

  it('escapes } ', function() {
    helpers.wikisafe('}').should.equal('\\}');
  });

  
});