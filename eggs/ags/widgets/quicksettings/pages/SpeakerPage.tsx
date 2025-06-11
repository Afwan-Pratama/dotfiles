import AstalWp from "gi://AstalWp?version=0.1";
import { qsPage } from "../QSWindow";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";

type SpeakerPageProps = {
	streamName: string
}

export default function SpeakerPage({ streamName }: SpeakerPageProps) {
	const audio = AstalWp.get_default()!.audio;

	let streamAudio = bind(audio, "speakers")

	if (streamName == "Microphones") {
		streamAudio = bind(audio, "microphones")
	}

	return (
		<box
			name={streamName.toLowerCase()}
			cssClasses={["speaker-page", "qs-page"]}
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
				<label label={streamName} hexpand xalign={0} />
			</box>
			<Gtk.Separator />
			{
				streamAudio.as((d) =>
					d.map((speaker) => (
						<button
							cssClasses={bind(speaker, "isDefault").as((isD) => {
								const classes = ["button"];
								isD && classes.push("active");
								return classes;
							})}
							onClicked={() => {
								speaker.set_is_default(true);
								qsPage.set("main");
							}}
						>
							<box>
								<image iconName={speaker.volumeIcon} />
								<label label={speaker.description} />
							</box>
						</button>
					)),
				)}
		</box>
	);
}
