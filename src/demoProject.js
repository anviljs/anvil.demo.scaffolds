var path = require( "path" );

module.exports = function( _, anvil ) {
	var root = path.resolve( __dirname, "../" );
	anvil.scaffold( {
		type: "demoProject",
		description: "creates a very simple node.js project for the quickstart",
		data: {
			user: anvil.env.userName,
			email: anvil.env.email,
			"header-name": "{{{name}}}",
			"header-description": "{{{description}}}",
			"header-version": "{{{version}}}",
			"header-author": "{{{author}}}"
		},
		prompt: [
			{
				name: "project-name",
				description: "project name",
				required: true
			},
			{
				name: "author",
				description: "author",
				required: false,
				"default": anvil.env.userName + " <" + anvil.env.email + ">"
			},
			{
				name: "license",
				description: "Which license? (MIT, BSD, GPL, MPL, MSPL, APACHE)",
				"default": "MIT",
				required: false
			},
			{
				name: "version",
				description: "starting version",
				"default": "0.1.0",
				required: true
			},
			{
				name: "description",
				description: "project description",
				"default": "",
				required: false
			}
		],
		output: {
			"{{{project-name}}}": {
				"README.md": anvil.scaffold.file( root + "/templates/README.md" ),
				".gitignore": anvil.scaffold.file( root + "/templates/gitignore" ),
				".npmignore": anvil.scaffold.file( root + "/templates/npmignore" ),
				"header.js": anvil.scaffold.file( root + "/templates/header.js" ),
				"LICENSE-{{{license}}}": function( data, done ) {
					anvil.fs.read( root + "/licenses/LICENSE-" + data[ "license" ], done );
				},
				"package.json": anvil.scaffold.file( root + "/templates/package.json" ),
				"build.json": anvil.scaffold.file( root + "/templates/build.json" ),
				src: {},
				lib: {}
			}
		}
	} );
};