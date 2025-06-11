import { App, Gtk, Gdk } from "astal/gtk4";
import PopupWindow from "../common/PopupWindow";
import { Variable } from "astal";
import options from "../../options";
import { Weather } from "../../utils/weather";
import { bind } from "astal";

export const WINDOW_NAME = "datemenu-window";

const { bar } = options;

const layout = Variable.derive(
	[bar.position, bar.start, bar.center, bar.end],
	(pos, start, center, end) => {
		if (start.includes("time")) return `${pos}_top`;
		if (center.includes("time")) return `${pos}_center`;
		if (end.includes("time")) return `${pos}_bottom`;

		return `${pos}_center`;
	},
);

function DateMenu(_gdkmonitor: Gdk.Monitor) {

	const weathers = Weather.get_default()

	return (
		<PopupWindow
			name={WINDOW_NAME}
			animation="slide left"
			layout={layout.get()}
			onDestroy={() => layout.drop()}
		>
			<box cssClasses={["window-content"]}>
				<box vertical cssClasses={["datemenu-container"]}>
					<Gtk.Calendar />
				</box>
				<box spacing={10} vertical cssClasses={["weathers-container"]}>
					{bind(weathers, "weathers").as(v => v.map(w => (
						<box cssClasses={["weather-card"]}>
							<image pixelSize={75} iconName={w.main.toLowerCase()} />
							<box valign={Gtk.Align.CENTER} halign={Gtk.Align.END} vertical>
								<label label={`${w.city},${w.country}`} />
								<label label={w.desc.toLocaleUpperCase()} />
							</box>
						</box>
					)))}
				</box>
			</box>
		</PopupWindow>
	);
}

export default function(_gdkmonitor: Gdk.Monitor) {
	DateMenu(_gdkmonitor);
	layout.subscribe(() => {
		App.remove_window(App.get_window(WINDOW_NAME)!);
		DateMenu(_gdkmonitor);
	});
}
