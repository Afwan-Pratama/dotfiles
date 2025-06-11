import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import TimePanelButton from "./TimePanelButton";
import NetworkSpeedPanelButton from "./NetworkSpeedPanelButton";
import LauncherPanelButton from "./LauncherPanelButton";
import NotifPanelButton from "./NotifPanelButton";
import QSPanelButton from "./QSPanelButton";
import { separatorBetween } from "../../utils";
import options from "../../options";
import { idle } from "astal";
import { WindowProps } from "astal/gtk4/widget";
import TrayPanelButton from "./TrayPanelButton";
import WorkspacesPanelButton from "./WorkspacesPanelButton";

const { bar } = options;
const { start, center, end } = bar;

const panelButton = {
	launcher: () => <LauncherPanelButton />,
	time: () => <TimePanelButton />,
	notification: () => <NotifPanelButton />,
	network_speed: () => <NetworkSpeedPanelButton />,
	quicksetting: () => <QSPanelButton />,
	traypanel: () => <TrayPanelButton />,
	workspaces: () => <WorkspacesPanelButton />
};

function Start() {
	return (
		<box vertical valign={Gtk.Align.START}>
			{start((s) => [
				...separatorBetween(
					s.map((s) => panelButton[s]()),
					Gtk.Orientation.HORIZONTAL,
				),
			])}
		</box>
	);
}

function Center() {
	return (
		<box vertical valign={Gtk.Align.CENTER}>
			{center((c) =>
				separatorBetween(
					c.map((w) => panelButton[w]()),
					Gtk.Orientation.HORIZONTAL,
				),
			)}
		</box>
	);
}

function End() {
	return (
		<box vertical valign={Gtk.Align.END}>
			{end((e) =>
				separatorBetween(
					e.map((w) => panelButton[w]()),
					Gtk.Orientation.HORIZONTAL,
				),
			)}
		</box>
	);
}

type BarProps = WindowProps & {
	gdkmonitor: Gdk.Monitor;
	animation: string;
};
function Bar({ gdkmonitor, ...props }: BarProps) {
	const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

	return (
		<window
			visible
			setup={(self) => {
				// problem when change bar size via margin/padding live
				// https://github.com/wmww/gtk4-layer-shell/issues/60
				self.set_default_size(1, 1);
			}}
			name={"bar"}
			namespace={"bar"}
			gdkmonitor={gdkmonitor}
			anchor={LEFT | TOP | BOTTOM}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			application={App}
			{...props}
		>
			<centerbox orientation={1} cssClasses={["bar-container"]}>
				<Start />
				<Center />
				<End />
			</centerbox>
		</window>
	);
}

export default function(gdkmonitor: Gdk.Monitor) {
	<Bar gdkmonitor={gdkmonitor} animation="slide top" />;

	bar.position.subscribe(() => {
		App.toggle_window("bar");
		const barWindow = App.get_window("bar")!;
		barWindow.set_child(null);
		App.remove_window(App.get_window("bar")!);
		idle(() => {
			<Bar gdkmonitor={gdkmonitor} animation="slide top" />;
		});
	});
}
