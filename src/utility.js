var npm;

module.exports = function( _, anvil ) {

	anvil.task( "npm-update", "updates your projects dependencies", function( done ) {
		npm = require( "npm" );
		npm.load( npm.config, function( err, npm ) {
			try {
				npm.config.set( "global", false );
				npm.commands.update( [], function( err, data ) {
					if( err ) {
						anvil.log.error( "NPM update failed with: \n" + err );
					} else {
						anvil.log.event( data );
					}
					done();
				} );
			} catch ( error ) {
				anvil.log.error( "NPM update failed with: \n" + error.stack );
				done();
			}
		} );
	} );

};