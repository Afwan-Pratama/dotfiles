import { GLib } from "astal";
import { mkOptions, opt } from "./utils/option";
import { gsettings } from "./utils";

const options = mkOptions(
	`${GLib.get_user_config_dir()}/epik-shell/config.json`,
	{
		dock: {
			position: opt("bottom"),
			pinned: opt(["zen", "org.gnome.Nautilus", "localsend"]),
		},
		bar: {
			position: opt("left"),
			separator: opt(true),
			start: opt(["launcher", "workspaces"]),
			center: opt(["time", "notification"]),
			end: opt(["network_speed", "quicksetting", "traypanel"]),
		},
		weathers: {
			update_interval: 10, //minute
			code: ["1850147", "1622636"],
		},
		theme: {
			mode: opt(
				gsettings.get_string("color-scheme") == "prefer-light"
					? "light"
					: "dark",
				{ cached: true },
			),
			bar: {
				bg_color: opt("$bg"),
				opacity: opt(0.9),
				border_radius: opt(10),
				margin: opt([200, 14]),
				padding: opt(3),
				border_width: opt(2),
				border_color: opt("$fg"),
				shadow: {
					offset: opt([0, 0]),
					blur: opt(0),
					spread: opt(0),
					color: opt("$fg"),
					opacity: opt(0.9),
				},
				button: {
					bg_color: opt("$bg"),
					fg_color: opt("$fg"),
					opacity: opt(0.9),
					border_radius: opt(10),
					border_width: opt(0),
					border_color: opt("$fg"),
					padding: opt([0, 4]),
					shadow: {
						offset: opt([0, 0]),
						blur: opt(0),
						spread: opt(0),
						color: opt("$fg"),
						opacity: opt(0.9),
					},
				},
			},
			window: {
				opacity: opt(0.9),
				border_radius: opt(10),
				margin: opt(10),
				padding: opt(10),
				dock_padding: opt(4),
				desktop_clock_padding: opt(4),
				border_width: opt(2),
				border_color: opt("$fg"),
				shadow: {
					offset: opt([0, 0]),
					blur: opt(0),
					spread: opt(0),
					color: opt("$fg"),
					opacity: opt(1),
				},
			},
			light: {
				bg: opt("#fbf1c7"),
				fg: opt("#3c3836"),
				accent: opt("#3c3836"),
				red: opt("#cc241d"),
			},
			dark: {
				bg: opt("#1F1F28"),
				fg: opt("#DCD7BA"),
				accent: opt("#7E9CD8"),
				red: opt("#cc241d"),
			},
		},
	},
);

export default options;
