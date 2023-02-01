PATH = "~/.config/awesome/widgets/script/scroll_spotify_status.sh"

local watch = require("awful.widget.watch")

local mpris_tail = watch("sh ~/.config/awesome/widgets/script/scroll_spotify_status.sh", 1)
