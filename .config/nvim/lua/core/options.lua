local opts = {
	tabstop = 4,
	softtabstop = 4,
	shiftwidth = 4,
	expandtab = true,
	wrap = false,
	termguicolors = true,
	number = true,
	relativenumber = true,

	swapfile = false,
	backup = false,
	undodir = os.getenv("HOME") .. "/.cache/nvim/undodir",
	undofile = true,

	scrolloff = 8,
	updatetime = 50,
}

-- Set options from table
for opt, val in pairs(opts) do
	vim.o[opt] = val
end
