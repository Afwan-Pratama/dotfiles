import { Astal, Gtk, Gdk } from "astal/gtk4";
import Powermenu from "../../utils/powermenu";
import PopupWindow from "../common/PopupWindow";
import { FlowBox } from "../common/FlowBox";

const powermenu = Powermenu.get_default();
export const WINDOW_NAME = "powermenu";

const icons = {
	sleep: "weather-clear-night-symbolic",
	reboot: "system-reboot-symbolic",
	logout: "system-log-out-symbolic",
	shutdown: "system-shutdown-symbolic",
	lockscreen: "system-lock-screen-symbolic"
};

function SysButton({ action, label }: { action: string; label: string }) {
	return (
		<button
			cssClasses={["system-button"]}
			onClicked={() => powermenu.action(action)}
		>
			<box vertical spacing={6}>
				<image iconName={icons[action]} iconSize={Gtk.IconSize.LARGE} />
				<label label={label} />
			</box>
		</button>
	);
}

export default function PowerMenu(_gdkmonitor: Gdk.Monitor) {
	return (
		<PopupWindow
			name={WINDOW_NAME}
			exclusivity={Astal.Exclusivity.IGNORE}
			animation="popin 80%"
		>
			<FlowBox
				cssClasses={["window-content", "powermenu-container"]}
				hexpand
				rowSpacing={6}
				columnSpacing={6}
				maxChildrenPerLine={5}
				setup={(self) => {
					self.connect("child-activated", (_, child) => {
						child.get_child()?.activate();
					});
				}}
				homogeneous
			>
				<SysButton action={"lockscreen"} label={"Lockscreen"} />
				<SysButton action={"sleep"} label={"Sleep"} />
				<SysButton action={"logout"} label={"Log Out"} />
				<SysButton action={"reboot"} label={"Reboot"} />
				<SysButton action={"shutdown"} label={"Shutdown"} />
			</FlowBox>
		</PopupWindow>
	);
}
