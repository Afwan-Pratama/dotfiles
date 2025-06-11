import { Variable } from "astal";
import { App, Astal, Gdk, Gtk, hook } from "astal/gtk4";
import DockApps from "./DockApps";
import options from "../../options";
import { WindowProps } from "astal/gtk4/widget";
import { Niri } from "../../utils/niri";

const niri = Niri.get_default();
const { TOP, BOTTOM } = Astal.WindowAnchor;
const { dock } = options;

const updateVisibility = () => {
	return (
		niri.overviewState.is_open
	);
};

export const dockVisible = Variable(updateVisibility());

// transparent window to detect hover
function DockHover(_gdkmonitor: Gdk.Monitor) {
	const anchor = dock.position.get() == "top" ? TOP : BOTTOM;

	return (
		<window
			visible={dockVisible((v) => !v)}
			name={"dock-hover"}
			namespace={"dock-hover"}
			setup={(self) => {
				hook(self, App, "window-toggled", (_, win) => {
					if (win.name == "dock" && win.visible) {
						self.visible = false;
					}
				});
			}}
			onDestroy={() => dockVisible.drop()}
			layer={Astal.Layer.TOP}
			anchor={anchor}
			application={App}
			onHoverEnter={() => {
				App.get_window("dock")!.set_visible(true);
			}}
		>
			<box
				cssClasses={["dock-padding"]}
				widthRequest={widthVar()}
				heightRequest={heightVar()}
			>
				{/* I dont know why window/box not visible when there's no child/background-color */}
				{/* So I give this child and set it to transparent so I can detect hover */}
				{/* might be gtk4-layer-shell bug, idk */}
				placeholder
			</box>
		</window>
	);
}

type DockProps = WindowProps & {
	gdkmonitor: Gdk.Monitor;
	animation?: string;
};
function Dock({ gdkmonitor, ...props }: DockProps) {
	const anchor = dock.position.get() == "top" ? TOP : BOTTOM;

	return (
		<window
			visible={dockVisible()}
			name={"dock"}
			namespace={"dock"}
			layer={Astal.Layer.TOP}
			anchor={anchor}
			onDestroy={() => dockVisible.drop()}
			setup={(self) => {
				hook(self, App, "window-toggled", (_, win) => {
					if (win.name == "dock-hover" && win.visible) {
						self.visible = false;
					}
					if (win.name == "dock") {
						const size = getSize(win);
						heightVar.set(
							14 > size!.height ? size!.height : 14,
						);
						widthVar.set(size!.width);
					}
				});
			}}
			onHoverLeave={() => {
				if (!updateVisibility()) {
					App.get_window("dock-hover")!.set_visible(true);
				}
			}}
			application={App}
			{...props}
		>
			<box>
				<box hexpand />
				<DockApps />
				<box hexpand />
			</box>
		</window>
	);
}

const widthVar = Variable(0);
const heightVar = Variable(0);
const getSize = (win: Gtk.Window) => win.get_child()!.get_preferred_size()[0];
// const getHoverHeight = () => {
// 	const pos = dock.position.get() == "top" ? 0 : 2;
// 	const hyprlandGapsOut = hyprland
// 		.message("getoption general:gaps_out")
// 		.split("\n")[0]
// 		.split("custom type: ")[1]
// 		.split(" ")
// 		.map((e) => parseInt(e));
// 	return hyprlandGapsOut.length >= 3
// 		? hyprlandGapsOut[pos]
// 		: hyprlandGapsOut[0];
// };

function setHoverSize() {
	const dockWindow = App.get_window("dock");
	const size = getSize(dockWindow!);

	widthVar.set(size!.width);
	heightVar.set(
		14 > size!.height ? size!.height : 14,
	);
}

export default function(gdkmonitor: Gdk.Monitor) {
	<Dock gdkmonitor={gdkmonitor} />;
	dockVisible
		.observe(niri, "notify::overviewState", () => {
			return updateVisibility();
		})
	DockHover(gdkmonitor);
	setHoverSize();

	dock.position.subscribe(() => {
		dockVisible.drop();
		const dockW = App.get_window("dock")!;
		dockW.set_child(null);
		dockW.destroy();
		<Dock gdkmonitor={gdkmonitor} />;
		const dockHover = App.get_window("dock-hover")!;
		dockHover.set_child(null);
		dockHover.destroy();
		setHoverSize();
		dockVisible
			.observe(niri, "notify::overviewState", () => {
				return updateVisibility();
			})
		DockHover(gdkmonitor);
	});
}
