-- Nicer filetree than NetRW
return {
	{
		"nvim-neo-tree/neo-tree.nvim",
		branch = "v2.x",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-tree/nvim-web-devicons",
			"MunifTanjim/nui.nvim",
		},
		config = function()
			require("neo-tree").setup({
				commands = {
					parent_or_close = function(state)
						local node = state.tree:get_node()
						if (node.type == "directory" or node:has_children()) and node:is_expanded() then
							state.commands.toggle_node(state)
						else
							require("neo-tree.ui.renderer").focus_node(state, node:get_parent_id())
						end
					end,
					child_or_open = function(state)
						local node = state.tree:get_node()
						if node.type == "directory" or node:has_children() then
							if not node:is_expanded() then -- if unexpanded, expand
								state.commands.toggle_node(state)
							else       -- if expanded and has children, seleect the next child
								require("neo-tree.ui.renderer").focus_node(state, node:get_child_ids()[1])
							end
						else -- if not a directory just open it
							state.commands.open(state)
						end
					end,
					copy_selector = function(state)
						local node = state.tree:get_node()
						local filepath = node:get_id()
						local filename = node.name
						local modify = vim.fn.fnamemodify

						local results = {
							e = { val = modify(filename, ":e"), msg = "Extension only" },
							f = { val = filename, msg = "Filename" },
							F = { val = modify(filename, ":r"), msg = "Filename w/o extension" },
							h = { val = modify(filepath, ":~"), msg = "Path relative to Home" },
							p = { val = modify(filepath, ":."), msg = "Path relative to CWD" },
							P = { val = filepath, msg = "Absolute path" },
						}

						local messages = {
							{ "\nChoose to copy to clipboard:\n", "Normal" },
						}
						for i, result in pairs(results) do
							if result.val and result.val ~= "" then
								vim.list_extend(messages, {
									{ ("%s."):format(i),           "Identifier" },
									{ (" %s: "):format(result.msg) },
									{ result.val,                  "String" },
									{ "\n" },
								})
							end
						end
						vim.api.nvim_echo(messages, false, {})
						local result = results[vim.fn.getcharstr()]
						if result and result.val and result.val ~= "" then
							vim.notify("Copied: " .. result.val)
							vim.fn.setreg("+", result.val)
						end
					end,
				},
				window = {
					mappings = {
						["<space>"] = false, -- disable space until we figure out which-key disabling
						["[b"] = "prev_source",
						["]b"] = "next_source",
						["o"] = "open",
						["h"] = "parent_or_close",
						["l"] = "child_or_open",
						["Y"] = "copy_selector",
					},
				},
			})
			require("helpers.keys").map(
				{ "n", "v" },
				"<leader>e",
				"<cmd>NeoTreeRevealToggle<cr>",
				"Toggle file explorer"
			)
		end,
	},
}
