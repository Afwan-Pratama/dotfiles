import { timeout, Variable } from "astal";
import { bind } from "astal";
import { App, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";
import AstalMpris from "gi://AstalMpris";
import Pango from "gi://Pango";
import options from "../../options";
import { ButtonProps } from "astal/gtk4/widget";
import { Niri } from "../../utils/niri";

const niri = Niri.get_default();
const application = new AstalApps.Apps();
const iconTheme = new Gtk.IconTheme({ themeName: App.iconTheme });

type AppButtonProps = ButtonProps & {
	app: AstalApps.Application;
	pinned?: boolean;
	term: string;
	windowId: number | null
};
function AppButton({
	app,
	onClicked,
	term,
	windowId,
	pinned = false,
}: AppButtonProps) {
	const substitute = {
		kitty: "terminal",
		localsend: "send-to",
		"spotify": "org.gnome.Lollypop-spotify",
		"org.gnome.Nautilus": "system-file-manager",
	};

	const iconName = `${substitute[app.iconName] ?? app.iconName}-symbolic`;

	return (
		<button
			onClicked={onClicked}
			cssClasses={bind(niri, "focusedWindow").as((fcsWindow) => {
				const classes = ["app-button"];
				if (!fcsWindow || !term || !fcsWindow.app_id) return classes;

				const isFocused = !pinned
					? windowId != null || windowId == fcsWindow.id
					: fcsWindow.app_id.toLowerCase().includes(term.toLowerCase());

				if (isFocused) classes.push("focused");
				return classes;
			})}
		>
			<overlay>
				<box cssClasses={["box"]} />
				<image
					type="overlay"
					halign={Gtk.Align.CENTER}
					valign={Gtk.Align.CENTER}
					iconName={`${iconName}`}
					pixelSize={iconTheme.has_icon(`${iconName}`) ? 32 : 38}
				/>
				<box
					type="overlay"
					cssClasses={["indicator"]}
					valign={Gtk.Align.END}
					halign={Gtk.Align.CENTER}
					visible={bind(niri, "windows").as((windows) => {
						return windows
							.map((e) => e.app_id.toLowerCase())
							.includes(term.toLowerCase());
					})}
				/>
			</overlay>
		</button>
	);
}

function AppsList() {
	const pinnedApps = Variable.derive([options.dock.pinned], (p) => {
		return p
			.map((term) => ({
				app: application.list.find((e) => e.entry.split(".desktop")[0] == term),
				term,
			}))
			.filter(({ app }) => app);
	});

	return (
		<box spacing={6}>
			{pinnedApps((apps) =>
				apps.map(({ app, term }) => (
					<AppButton
						app={app!}
						windowId={null}
						term={term}
						pinned={true}
						onClicked={() => {
							for (const window of niri.windows) {
								if (window.app_id.toLowerCase().includes(term.toLowerCase())) {
									timeout(1, () => {
										App.get_window("dock-hover")!.set_visible(true);
									});
									return niri.focusWindow(window.id);
								}
							}

							app!.launch();
						}}
					/>
				)),
			)}
			{bind(niri, "windows").as((clients) =>
				clients
					.reverse()
					.map((window) => {
						for (const appClass of options.dock.pinned.get()) {
							if (window.app_id.toLowerCase().includes(appClass.toLowerCase())) {
								return;
							}
						}

						for (const app of application.list) {
							if (
								window.app_id &&
								app.entry
									.split(".desktop")[0]
									.toLowerCase()
									.match(window.app_id.toLowerCase())
							) {
								return (
									<AppButton
										app={app}
										onClicked={() => {
											timeout(1, () => {
												App.get_window("dock-hover")!.set_visible(true);
											});
											niri.focusWindow(window.id);
										}}
										windowId={window.id}
										term={window.app_id}
									/>
								);
							}
						}
					})
					.filter((item) => item !== undefined),
			)}
		</box>
	);
}

function MediaPlayer({ player }) {
	if (!player) {
		return <box />;
	}
	const title = bind(player, "title").as((t) => t || "Unknown Track");
	const artist = bind(player, "artist").as((a) => a || "Unknown Artist");
	const coverArt = bind(player, "coverArt");

	const playIcon = bind(player, "playbackStatus").as((s) =>
		s === AstalMpris.PlaybackStatus.PLAYING
			? "media-playback-pause-symbolic"
			: "media-playback-start-symbolic",
	);

	return (
		<box cssClasses={["media-player"]} hexpand>
			<image
				overflow={Gtk.Overflow.HIDDEN}
				pixelSize={35}
				cssClasses={["cover"]}
				file={coverArt}
			/>
			<box vertical hexpand>
				<label
					ellipsize={Pango.EllipsizeMode.END}
					halign={Gtk.Align.START}
					label={title}
					maxWidthChars={15}
				/>
				<label halign={Gtk.Align.START} label={artist} />
			</box>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.CENTER}
				onClicked={() => player.previous()}
				visible={bind(player, "canGoPrevious")}
			>
				<image iconName="media-skip-backward-symbolic" pixelSize={24} />
			</button>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.CENTER}
				onClicked={() => player.play_pause()}
				visible={bind(player, "canControl")}
			>
				<image iconName={playIcon} pixelSize={18} />
			</button>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.CENTER}
				onClicked={() => player.next()}
				visible={bind(player, "canGoNext")}
			>
				<image iconName="media-skip-forward-symbolic" pixelSize={24} />
			</button>
		</box>
	);
}

export default function DockApps() {
	const mpris = AstalMpris.get_default();
	return (
		<box cssClasses={["window-content", "dock-container"]} hexpand={false}>
			<AppsList />
			{bind(mpris, "players").as((players) => (
				<>
					{/* <button iconName={players[0].entry === "zen" ? "zen-browser" : players[0].entry} onScroll={() => print("halo")} /> */}
					<MediaPlayer player={players[0]} />
				</>
			))}
			<Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
			<AppButton
				app={{ iconName: "user-trash" } as AstalApps.Application}
				onClicked={"nautilus trash:///"}
				term={""}
				windowId={null}
			/>
		</box>
	);
}
