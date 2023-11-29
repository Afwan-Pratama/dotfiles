return {
	{
		"folke/which-key.nvim",
		config = function()
			local wk = require("which-key")
			wk.setup()
			wk.register({
				["<leader>"] = {
					f = { name = "Find" },
					b = { name = "Buffer" },
					q = { name = "Quit" },
					S = { name = "Session" },
					l = { name = "LSP" },
					u = { name = "UI" },
					g = { name = "Git" },
					r = { name = "Search & Replace" },
					x = { name = "Troule" }
				},
			})
		end,
	},
}
