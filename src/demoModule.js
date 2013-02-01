var handlebars;
var path = require( "path" );

module.exports = function( _, anvil ) {
	var root = path.resolve( __dirname, "../" );
	
	anvil.scaffold( {
		type: "demoModule",
		description: "creates a simple node module wrapper for the quickstart",
		configure: function( config, command, done ) {
			handlebars = require( "handlebars" );
			handlebars.registerHelper( "fileName", function( text ) {
				return text[0].toLowerCase() + text.slice(1);
			} );
			done();
		},
		prompt: [
			{
				name: "module-name",
				description: "module name",
				required: true
			}
		],
		output: {
			"src/{{{fileName module-name}}}.js": anvil.scaffold.file( root + "/templates/module.js" )
		},
		render: function( options ) {
			var template = handlebars.compile( options.template );
			return template( options.data );
		}
	} );
};