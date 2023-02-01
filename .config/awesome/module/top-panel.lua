--      ████████╗ ██████╗ ██████╗     ██████╗  █████╗ ███╗   ██╗███████╗██╗
--      ╚══██╔══╝██╔═══██╗██╔══██╗    ██╔══██╗██╔══██╗████╗  ██║██╔════╝██║
--         ██║   ██║   ██║██████╔╝    ██████╔╝███████║██╔██╗ ██║█████╗  ██║
--         ██║   ██║   ██║██╔═══╝     ██╔═══╝ ██╔══██║██║╚██╗██║██╔══╝  ██║
--         ██║   ╚██████╔╝██║         ██║     ██║  ██║██║ ╚████║███████╗███████╗
--         ╚═╝    ╚═════╝ ╚═╝         ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝

-- ===================================================================
-- Initialization
-- ===================================================================

local awful = require("awful")
local beautiful = require("beautiful")
local wibox = require("wibox")
local gears = require("gears")
local dpi = beautiful.xresources.apply_dpi

-- import widgets
local task_list = require("widget.task-list")

-- define module table
local top_panel = {}

-- ===================================================================
-- Bar Creation
-- ===================================================================

top_panel.create = function(s)
	local panel_shape = function(cr, width, height)
		gears.shape.partially_rounded_rect(cr, width, height, true, true, true, true, 7.5)
	end

	local panel = awful.wibar({
		screen = s,
		position = "top",
		ontop = true,
		height = beautiful.top_panel_height,
		width = s.geometry.width * 9.90 / 10,
		margins = {
			top = 5,
			bottom = 0,
		},
		shape = panel_shape,
	})
	local mpris = require("widget.mpris")
	local net = require("widget.net-speed")
	local volume = require("widget.volume-widget.volume")
	local cpu = require("widget.cpu-widget.cpu-widget")
	local ram = require("widget.ram-widget.ram-widget")
	local tail = require("widget.script")

	local separator = wibox.widget({
		markup = " ",
		widget = wibox.widget.textbox,
	})

	panel:setup({
		expand = "none",
		layout = wibox.layout.align.horizontal,
		task_list.create(s),
		require("widget.calendar").create(s),
		{
			layout = wibox.layout.fixed.horizontal,
			wibox.layout.margin(mpris(), dpi(5), dpi(5), dpi(5), dpi(5)),
			separator,
			-- net(),
			wibox.layout.margin(ram(), dpi(2), dpi(2), dpi(2), dpi(2)),
			separator,
			wibox.layout.margin(cpu(), dpi(5), dpi(5), dpi(5), dpi(5)),
			separator,
			wibox.layout.margin(volume(), dpi(6), dpi(6), dpi(6), dpi(6)),
			wibox.layout.margin(require("widget.layout-box"), dpi(5), dpi(5), dpi(5), dpi(5)),
			wibox.layout.margin(wibox.widget.systray(), dpi(5), dpi(5), dpi(5), dpi(5)),
		},
	})

	-- ===================================================================
	-- Functionality
	-- ===================================================================

	-- hide panel when client is fullscreen
	local function change_panel_visibility(client)
		if client.screen == s then
			panel.ontop = not client.fullscreen
		end
	end

	-- connect panel visibility function to relevant signals
	client.connect_signal("property::fullscreen", change_panel_visibility)
	client.connect_signal("focus", change_panel_visibility)
end

return top_panel
