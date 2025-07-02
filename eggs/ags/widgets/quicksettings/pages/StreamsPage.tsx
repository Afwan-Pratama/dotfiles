import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import AstalWp from "gi://AstalWp?version=0.1";
import { qsPage } from "../QSWindow";
import Pango from "gi://Pango?version=1.0";


type StreamContainerProps = {
	stream: AstalWp.Stream
}

function StreamContainer({ stream }: StreamContainerProps) {

	return (
		<box
			cssClasses={["qs-box", "volume-box"]}
			valign={Gtk.Align.CENTER}
			spacing={10}
		>
			<button onClicked={() => stream.set_mute(!stream.mute)}>
				<image iconName={bind(stream, "volumeIcon")} valign={Gtk.Align.CENTER} />
			</button>
			<label label={bind(stream, "volume").as(v => `${Math.floor(v * 100).toString()}%`)} />
			<slider
				onChangeValue={(self) => {
					stream.volume = self.value;
				}}
				value={bind(stream, "volume")}
				hexpand
			/>
		</box>
	)
}

export default function StreamsPage() {
	const audio = AstalWp.get_default()!.audio

	return (
		<box
			name="streams"
			cssClasses={["qs-page"]}
			vertical
			spacing={6}
		>
			<box hexpand={false} cssClasses={["header"]} spacing={6}>
				<button
					onClicked={() => {
						qsPage.set("main");
					}}
					iconName={"go-previous-symbolic"}
				/>
				<label label={"Streams"} hexpand xalign={0} />
			</box>
			<Gtk.Separator />
			{
				bind(audio, "streams").as((streams) => streams.map((s) => (
					<box vertical spacing={2}>
						<box spacing={6}>
							<image iconName={bind(s, "icon").as(v => v)} />
							<label maxWidthChars={15} ellipsize={Pango.EllipsizeMode.END} label={bind(s, "name").as(v => v)} />
						</box>
						<StreamContainer stream={s} />
					</box>
				)))
			}
		</box>
	)
}
