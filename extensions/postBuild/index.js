module.exports = function( _, anvil ) {
	anvil.task( "localInstall", "installs the extension locally after the build", function() {
		require("shelljs/global");
		if( exec( "anvil install ./" ).code !== 0 ) {
			anvil.log.error( "Boo :(" );
		}
	} );
};