module.exports = function( _, anvil ) {
	require( "./demoModule")( _, anvil );
	require( "./demoProject")( _, anvil );
	require( "./demoSpec")( _, anvil );
	require( "./utility")( _, anvil );
};