local map = require("helpers.keys").map

-- Blazingly fast way out of insert mode
map("i", "jk", "<esc>")

-- Quick access to some common actions
map("n", "<leader>qq", "<cmd>q<cr>", "Quit")
map("n", "<leader>qa", "<cmd>qa!<cr>", "Quit all")
map("n", "<C-c>", "<cmd>close<cr>", "Window")

-- Diagnostic keymaps
map("n", "gx", vim.diagnostic.open_float, "Show diagnostics under cursor")

-- Easier access to beginning and end of lines
map("n", "<M-h>", "^", "Go to beginning of line")
map("n", "<M-l>", "$", "Go to end of line")

-- Better window navigation
map("n", "<C-h>", "<C-w><C-h>", "Navigate windows to the left")
map("n", "<C-j>", "<C-w><C-j>", "Navigate windows down")
map("n", "<C-k>", "<C-w><C-k>", "Navigate windows up")
map("n", "<C-l>", "<C-w><C-l>", "Navigate windows to the right")

-- Move with shift-arrows
map("n", "<S-Left>", "<C-w><S-h>", "Move window to the left")
map("n", "<S-Down>", "<C-w><S-j>", "Move window down")
map("n", "<S-Up>", "<C-w><S-k>", "Move window up")
map("n", "<S-Right>", "<C-w><S-l>", "Move window to the right")

-- Resize with arrows
map("n", "<C-Up>", ":resize +2<CR>")
map("n", "<C-Down>", ":resize -2<CR>")
map("n", "<C-Left>", ":vertical resize +2<CR>")
map("n", "<C-Right>", ":vertical resize -2<CR>")

-- Deleting buffers
local buffers = require("helpers.buffers")
map("n", "<leader>bc", buffers.delete_this, "Current buffer")
map("n", "<leader>bo", buffers.delete_others, "Other buffers")
map("n", "<leader>ba", buffers.delete_all, "All buffers")

-- Navigate buffers
map("n", "<S-l>", ":bnext<CR>")
map("n", "<S-h>", ":bprevious<CR>")

-- Stay in indent mode
map("v", "<", "<gv")
map("v", ">", ">gv")

--
map("v", "J", ":m '>+1<CR>gv=gv")
map("v", "K", ":m '<-2<CR>gv=gv")

map("n", "n", "nzzzv")
map("n", "N", "Nzzzv")

-- Switch between light and dark modes
-- Clear after search
map("n", "<leader>ur", "<cmd>nohl<cr>", "Clear highlights")

-- Search & replace
map("v", "<C-r>", "<CMD>SearchReplaceSingleBufferVisualSelection<CR>")
map("v", "<C-s>", "<CMD>SearchReplaceWithinVisualSelection<CR>")
map("v", "<C-b>", "<CMD>SearchReplaceWithinVisualSelectionCWord<CR>")

map("n", "<leader>rs", "<CMD>SearchReplaceSingleBufferSelections<CR>", "SearchReplaceSingleBuffer [s]elction list")
map("n", "<leader>ro", "<CMD>SearchReplaceSingleBufferOpen<CR>", "[o]pen")
map("n", "<leader>rw", "<CMD>SearchReplaceSingleBufferCWord<CR>", "[w]ord")
map("n", "<leader>rW", "<CMD>SearchReplaceSingleBufferCWORD<CR>", "[W]ord")
map("n", "<leader>re", "<CMD>SearchReplaceSingleBufferCExpr<CR>", "[e]xpr")
map("n", "<leader>rf", "<CMD>SearchReplaceSingleBufferCFile<CR>", "[f]ile")

map("n", "<leader>rbs", "<CMD>SearchReplaceMultiBufferSelections<CR>", "SearchReplaceMultiBuffer [s]elction list")
map("n", "<leader>rbo", "<CMD>SearchReplaceMultiBufferOpen<CR>", "[o]pen")
map("n", "<leader>rbw", "<CMD>SearchReplaceMultiBufferCWord<CR>", "[w]ord")
map("n", "<leader>rbW", "<CMD>SearchReplaceMultiBufferCWORD<CR>", "[W]ord")
map("n", "<leader>rbf", "<CMD>SearchReplaceMultiBufferCFile<CR>", "[f]ile")

-- Session
map("n", "<leader>Sr", "<cmd>SessionLoadLast<cr>", "Restore last session")
map("n", "<leader>Sd", "<cmd>SessionDelete<cr>", "Delete current session")

-- Trouble
-- Lua
map("n", "<leader>xx", function() require("trouble").toggle() end, "Toggle trouble")
map("n", "<leader>xw", function() require("trouble").toggle("workspace_diagnostics") end, "Open workspace diagnostics")
map("n", "<leader>xd", function() require("trouble").toggle("document_diagnostics") end, "Open document diagnostics")
map("n", "<leader>xq", function() require("trouble").toggle("quickfix") end, "Quickfix")
map("n", "<leader>xl", function() require("trouble").toggle("loclist") end, "Loclist")
map("n", "gR", function() require("trouble").toggle("lsp_references") end, "Lsp reference")
map("n", "<leader>xd", function()
	require("trouble").toggle("document_diagnostics")
end, "Open document diagnostics")
map("n", "<leader>xq", function()
	require("trouble").toggle("quickfix")
end, "Quickfix")
map("n", "<leader>xl", function()
	require("trouble").toggle("loclist")
end, "Loclist")
map("n", "gR", function()
	require("trouble").toggle("lsp_references")
end, "Lsp reference")
