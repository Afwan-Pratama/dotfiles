return {
	-- Lua
	{
		"olimorris/persisted.nvim",
		config = function()
			require("persisted").setup({})
		end,
	},
}
