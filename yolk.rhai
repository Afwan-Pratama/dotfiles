const themes = #{
	kanagawa : #{
		base00: "#1f1f28",
  		base01: "#16161d",
  		base02: "#223249",
  		base03: "#54546d",
  		base04: "#727169",
  		base05: "#dcd7ba",
  		base06: "#c8c093",
  		base07: "#717c7c",
  		base08: "#c34043",
  		base09: "#ffa066",
  		base0A: "#c0a36e",
  		base0B: "#76946a",
  		base0C: "#6a9589",
  		base0D: "#7e9cd8",
  		base0E: "#957fb8",
  		base0F: "#d27e99"
	},
};

const themesAlt = #{
	kanagawa : #{
		base00: "1f1f28",
  		base01: "16161d",
  		base02: "223249",
  		base03: "54546d",
  		base04: "727169",
  		base05: "dcd7ba",
  		base06: "c8c093",
  		base07: "717c7c",
  		base08: "c34043",
  		base09: "ffa066",
  		base0A: "c0a36e",
  		base0B: "76946a",
  		base0C: "6a9589",
  		base0D: "7e9cd8",
  		base0E: "957fb8",
  		base0F: "d27e99"
	},
};

const themesAlpha = #{
	kanagawa : #{
		base00: "rgba(31,31,40,0.9)",
  		base01: "rgba(22,22,29,0.9)",
  		base02: "rgba(34,50,73,0.9)",
  		base03: "rgba(84,84,109,0.9)",
  		base04: "rgba(114,113,105,0.9)",
  		base05: "rgba(220,215,186,1)",
  		base06: "rgba(200,192,147,1)",
  		base07: "rgba(113,124,124,1)",
  		base08: "rgba(195, 64, 67,0.9)",
  		base09: "rgba(255,160,102,0.9)",
  		base0A: "rgba(192,163,110,0.9)",
  		base0B: "rgba(118,148,106,0.9)",
  		base0C: "rgba(106,149,137,0.9)",
  		base0D: "rgba(126,156,216,0.9)",
  		base0E: "rgba(149,127,184,0.9)",
  		base0F: "rgba(210,126,153,0.9)"
	},
};

export let data = #{
	colors : themes.kanagawa,
	colorsAlt : themesAlt.kanagawa,
	icon : #{
		name : "Colloid",
	},
	cursor : #{
		name : "Vimix Kanagawa Cursors - Wave",
		nameAlt : "vimix-kanagawa-cursors-wave",
		size : 24
	},
	font : #{
		mono : "FiraCode Nerd Font Mono",
		sans : "Geist",
	}
};

export let eggs = #{
	kitty: "~/.config/kitty",
	gtk3: #{
		targets: "~/.config/gtk-3.0",
		enabled: true,
		templates: ["settings.ini", "gtk.css"]
	},
	gtk4: #{
		targets: "~/.config/gtk-4.0",
		enabled: true,
		templates: ["settings.ini", "gtk.css"]
	},
	nvim: "~/.config/nvim",
	zsh: "~/.config/zsh",
	ghostty: #{
		targets: "~/.config/ghostty",
		enabled: true,
		templates: ["*"],
	},
	zenbrowser: "~/.zen/b961n8ib.Default (release)/chrome",
	niri: #{
		targets: "~/.config/niri",
		enabled: true,
		templates: ["config.kdl"]
	},
	btop: "~/.config/btop",
	yazi: #{
		targets: "~/.config/yazi",
		enabled: true,
		templates: ["theme.toml", "custom.tmTheme"]
	},
	spicetify: "~/.config/spicetify",
	heroic: #{
		targets: "~/Games/Heroic/Themes",
		enabled: true,
		templates : ["custom.css"]
	},
	bat: #{
		targets: "~/.config/bat",
		enabled: true,
		templates : ["themes/custom.tmTheme"]
	},
	imv: #{
		targets: "~/.config/imv",
		enabled: true,
		templates: ["config"]
	},
	mpv: #{
		targets: "~/.config/mpv",
		enabled: true,
		templates: ["mpv.conf"]
	},
	zed: "~/.config/zed",
  zathura: "~/.config/zathura",
	MangoHud: #{
		targets: "~/.config/MangoHud",
		enabled: true,
		templates: ["MangoHud.conf"]
	},
	noctalia: "~/.config/noctalia",
	quickshell: "~/.config/quickshell",
  albafetch: "~/.config/albafetch",
};
