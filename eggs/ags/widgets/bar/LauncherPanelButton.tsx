import PanelButton from "../common/PanelButton";
import { WINDOW_NAME } from "../applauncher/Applauncher";
import { App } from "astal/gtk4";
import { GLib } from "astal";

export default function LauncherPanelButton() {
	return (
		<PanelButton
			window={WINDOW_NAME}
			onClicked={() => App.toggle_window(WINDOW_NAME)}
		>
			<image iconName={GLib.get_os_info("LOGO") || "preferences-desktop-apps-symbolic"} />
		</PanelButton>
	);
}
