import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import AstalWp from "gi://AstalWp";
import { qsPage } from "./QSWindow";

type VolumeContainerProps = {
	stream: AstalWp.Endpoint,
	streamName: string
}

function VolumeContainer({ stream, streamName }: VolumeContainerProps) {
	return (
		<box
			cssClasses={["qs-box", "volume-box"]}
			valign={Gtk.Align.CENTER}
			spacing={10}
		>
			<button onClicked={() => stream.set_mute(!stream.mute)}>
				<image iconName={bind(stream, "volumeIcon")} valign={Gtk.Align.CENTER} />
			</button>
			<label cssClasses={["volume-label"]} label={bind(stream, "volume").as(v => `${Math.floor(v * 100).toString()}%`)} />
			<slider
				onChangeValue={(self) => {
					stream.volume = self.value;
				}}
				value={bind(stream, "volume")}
				hexpand
			/>
			<button
				iconName={"go-next-symbolic"}
				onClicked={() => qsPage.set(streamName)}
			/>
		</box>

	)
}

export default function VolumeBox() {
	const speaker = AstalWp.get_default()?.audio!.defaultSpeaker!;
	const microphone = AstalWp.get_default()?.audio!.default_microphone!

	return (
		<box vertical spacing={10}>
			<VolumeContainer stream={speaker} streamName="speakers" />
			<VolumeContainer stream={microphone} streamName="microphones" />
		</box>
	);
}
