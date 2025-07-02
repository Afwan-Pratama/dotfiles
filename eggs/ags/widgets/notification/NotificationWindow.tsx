import AstalNotifd from "gi://AstalNotifd";
import PopupWindow from "../common/PopupWindow";
import { App, Gtk, Gdk } from "astal/gtk4";
import { bind, Variable } from "astal";
import Notification from "./Notification";
import options from "../../options";

export const WINDOW_NAME = "notifications";
const notifd = AstalNotifd.get_default();
const { bar } = options;

const layout = Variable.derive(
	[bar.position, bar.start, bar.center, bar.end],
	(pos, start, center, end) => {
		if (start.includes("notification")) return `${pos}_top`;
		if (center.includes("notification")) return `${pos}_center`;
		if (end.includes("notification")) return `${pos}_bottom`;

		return `${pos}_center`;
	},
);

function NotifsScrolledWindow() {
	const notifd = AstalNotifd.get_default();
	return (
		<Gtk.ScrolledWindow vexpand>
			<box vertical hexpand={false} spacing={8}>
				{bind(notifd, "notifications").as((notifs) =>
					notifs.map((e) => <Notification n={e} showActions={false} />),
				)}
				<box
					halign={Gtk.Align.CENTER}
					valign={Gtk.Align.CENTER}
					cssClasses={["not-found"]}
					vertical
					vexpand
					visible={bind(notifd, "notifications").as((n) => n.length === 0)}
				>
					<image
						iconName="notification-disabled-symbolic"
						iconSize={Gtk.IconSize.LARGE}
					/>
					<label label="Your inbox is empty" />
				</box>
			</box>
		</Gtk.ScrolledWindow>
	);
}

function DNDButton() {
	return (
		<button
			tooltipText={"Do Not Disturb"}
			onClicked={() => {
				notifd.set_dont_disturb(!notifd.get_dont_disturb());
			}}
			cssClasses={bind(notifd, "dont_disturb").as((dnd) => {
				const classes = ["dnd"];
				dnd && classes.push("active");
				return classes;
			})}
			label={"DND"}
		/>
	);
}

function ClearButton() {
	return (
		<button
			cssClasses={["clear"]}
			onClicked={() => {
				notifd.notifications.forEach((n) => n.dismiss());
			}}
			sensitive={bind(notifd, "notifications").as((n) => n.length > 0)}
		>
			<image iconName={"user-trash-full-symbolic"} />
		</button>
	);
}

function NotificationWindow(_gdkmonitor: Gdk.Monitor) {
	return (
		<PopupWindow
			name={WINDOW_NAME}
			animation="slide left"
			layout={layout.get()}
			onDestroy={() => layout.drop()}
		>
			<box
				cssClasses={["window-content", "notifications-container"]}
				vertical
				vexpand={false}
			>
				<box cssClasses={["window-header"]}>
					<label label={"Notifications"} hexpand xalign={0} />
					<DNDButton />
					<ClearButton />
				</box>
				<Gtk.Separator />
				<NotifsScrolledWindow />
			</box>
		</PopupWindow>
	);
}

export default function(_gdkmonitor: Gdk.Monitor) {
	NotificationWindow(_gdkmonitor);

	layout.subscribe(() => {
		App.remove_window(App.get_window(WINDOW_NAME)!);
		NotificationWindow(_gdkmonitor);
	});
}
