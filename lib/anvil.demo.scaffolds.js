/*
	anvil.demo.scaffolds - scaffolds for the quick start
	version:	0.1.0
	author:		Alex Robson
	copyright:	2011 - 2012
	license:	Dual licensed
				MIT (http://www.opensource.org/licenses/mit-license)
				GPL (http://www.opensource.org/licenses/gpl-license)
*/
module.exports = function( _, anvil ) {
	require( "./demoModule")( _, anvil );
	require( "./demoProject")( _, anvil );
	require( "./demoSpec")( _, anvil );
	require( "./utility")( _, anvil );
};