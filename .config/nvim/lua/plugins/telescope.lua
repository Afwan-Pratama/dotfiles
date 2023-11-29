-- Telescope fuzzy finding (all the things)
return {
	{
		"nvim-telescope/telescope.nvim",
		branch = "0.1.x",
		dependencies = {
			"nvim-lua/plenary.nvim",
			-- Fuzzy Finder Algorithm which requires local dependencies to be built. Only load if `make` is available
			{ "nvim-telescope/telescope-fzf-native.nvim", build = "make", cond = vim.fn.executable("make") == 1 },
		},
		config = function()
			require("telescope").setup({
				defaults = {
					mappings = {
						i = {
							["<C-u>"] = false,
							["<C-d>"] = false,
						},
					},
				},
				extensions = {
					persisted = {
						layout_config = {
							width = 0.55,
							height = 0.55,
						},
					},
				},
			})

			-- Enable telescope fzf native, if installed
			pcall(require("telescope").load_extension, "fzf")
			pcall(require("telescope").load_extension("persisted"))

			local map = require("helpers.keys").map
			map("n", "<leader>fr", require("telescope.builtin").oldfiles, "Recently opened")
			map("n", "<leader>fc", require("telescope.builtin").current_buffer_fuzzy_find, "Search in current buffer")
			map("n", "<leader>ff", require("telescope.builtin").find_files, "Files")
			map("n", "<leader>fh", require("telescope.builtin").help_tags, "Help")
			map("n", "<leader>fw", require("telescope.builtin").grep_string, "Current word")
			map("n", "<leader>fg", require("telescope.builtin").live_grep, "Grep")
			map("n", "<leader>Sf", "<cmd>Telescope persisted<cr>", "Find session")

			map("n", "<C-p>", require("telescope.builtin").keymaps, "Search keymaps")
		end,
	},
}
