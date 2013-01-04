module.exports = function( _, anvil ) {
	anvil.scaffold( {
		type: "{{{scaffold-type}}}",
		description: "{{{scaffold-description}}}",
		prompt: [
			// this is a simple template to use when creating prompts
			{
				name: "",
				description: "",
				required: true
			}
		],
		output: {
			// enter your folder/file structure here using object literal syntax
		}
	} );
};