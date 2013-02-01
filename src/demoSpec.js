var handlebars;
var path = require( "path" );

module.exports = function( _, anvil ) {
	var root = path.resolve( __dirname, "../" );

	anvil.scaffold( {
		type: "demoSpec",
		description: "creates a spec file for the quickstart",
		configure: function( config, command, done ) {
			handlebars = require( "handlebars" );
			handlebars.registerHelper( "fileName", function( text ) {
				return text[0].toLowerCase() + text.slice(1);
			} );
			done();
		},
		prompt: [
			// this is a simple template to use when creating prompts
			{
				name: "module-name",
				description: "name of module being tested",
				required: true
			}
		],
		output: {
			"spec/{{{fileName module-name}}}.spec.js": anvil.scaffold.file( root + "/templates/spec.js" )
		},
		render: function( options ) {
			var template = handlebars.compile( options.template );
			return template( options.data );
		},
		transform: {
			"./package.json": function( content, done ) {
				var pack = JSON.parse( content );
				if( pack.dependencies ) {
					if( !pack.dependencies[ "should" ] ) {
						pack.dependencies[ "should" ] = "~0.6";
					}
				} else {
					pack.dependencies = {
						"should": "~0.6"
					};
				}
				done( JSON.stringify( pack, undefined, 4 ) );
			},
			"./build.json": function( content, done ) {
				var build = JSON.parse( content ),
					testem = build[ "anvil.testem" ];

				if( testem ) {
					if( !testem.launchers ) {
						testem.launchers = {
							"Mocha": {
								"command": "mocha spec/*spec.js --reporter spec"
							}
						};
					} else {
						testem.launchers[ "Mocha" ] = {
							"command": "mocha spec/*spec.js --reporter spec"
						};
					}
					if( !testem.launch ) {
						testem.launch = "Mocha";
					} else if ( testem.launch !== "Mocha" ) {
						if( _.isArray( testem.launch ) ) {
							testem.launch = testem.launch.unshift( "Mocha" );
						} else {
							testem.launch = [ "Mocha", testem.launch ];
						}
					}
				} else {
					build[ "anvil.testem" ] = {
						"launchers": {
							"Mocha": {
								"command": "mocha spec/*spec.js --reporter spec"
							}
						},
						"launch": "Mocha"
					};
				}
				done( JSON.stringify( build, undefined, 4 ) );
			}
		},
		tasks: {
			after: {
				"npm-update": []
			}
		}
	} );
};