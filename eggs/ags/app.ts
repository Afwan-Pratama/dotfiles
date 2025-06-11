import { App } from "astal/gtk4";
import windows from "./windows";
import request from "./request";
import initStyles from "./utils/styles";
import { GLib } from "astal";

initStyles();

App.start({
	icons: `${GLib.get_user_config_dir()}/ags/assets/icons`,
	requestHandler(req, res) {
		request(req, res);
	},
	main() {
		windows.map((win) => App.get_monitors().map(win));
	},
});
