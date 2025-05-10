import { bind } from "astal";
import Wp from "gi://AstalWp";
import Popover from "../Popover";
import { Gtk } from "astal/gtk3";

const audioWp = Wp.get_default()?.audio!;

const defaultSpeaker = audioWp.defaultSpeaker!;

const defaultMicrophone = audioWp.defaultMicrophone!;

export default function ControlMenu() {
  return (
    <Popover
      valign={Gtk.Align.END}
      halign={Gtk.Align.START}
      marginLeft={70}
      marginBottom={13}
      name="control-menu"
      namespace="control-menu"
    >
      <box spacing={10} className="ControlMenu" vertical>
        <box className="AudioContainer" vertical>
          <box spacing={15}>
            <icon icon={defaultSpeaker.icon || "audio-x-generic-symbolic"} />
            <label label="Default Speaker" />
          </box>
          <box spacing={5}>
            <button
              onClick={() => defaultSpeaker.set_mute(!defaultSpeaker.mute)}
            >
              <icon icon={bind(defaultSpeaker, "volumeIcon")} />
            </button>
            <slider
              hexpand
              value={bind(defaultSpeaker, "volume").as((v) => v)}
              onDragged={({ value }) => defaultSpeaker.set_volume(value)}
            />
            <label
              label={bind(defaultSpeaker, "volume").as((v) => {
                return Math.floor(v * 100).toString();
              })}
            />
          </box>
        </box>
        <box className="AudioContainer" vertical>
          <box spacing={15}>
            <icon icon={defaultMicrophone.icon || "audio-x-generic-symbolic"} />
            <label label="Default Microphone" />
          </box>
          <box spacing={5}>
            <button
              onClick={() =>
                defaultMicrophone?.set_mute(!defaultMicrophone.mute)
              }
            >
              <icon icon={bind(defaultMicrophone, "volumeIcon")} />
            </button>
            <slider
              hexpand
              value={bind(defaultMicrophone, "volume").as((v) => v)}
              onDragged={({ value }) => defaultMicrophone?.set_volume(value)}
            />
            <label
              label={bind(defaultMicrophone, "volume").as((v) => {
                return Math.floor(v * 100).toString();
              })}
            />
          </box>
        </box>
        {bind(audioWp, "streams").as((arr) =>
          arr.map((stream) => (
            <box className="AudioContainer" vertical>
              <box spacing={15}>
                <icon
                  icon={bind(stream, "icon") || "audio-x-generic-symbolic"}
                />
                <label label={stream.name} />
              </box>
              <box spacing={5}>
                <button onClick={() => stream.set_mute(!stream.mute)}>
                  <icon icon={bind(stream, "volumeIcon")} />
                </button>
                <slider
                  hexpand
                  value={bind(stream, "volume").as((v) => v)}
                  onDragged={({ value }) => stream.set_volume(value)}
                />
                <label
                  label={bind(stream, "volume").as((v) => {
                    return Math.floor(v * 100).toString();
                  })}
                />
              </box>
            </box>
          )),
        )}
      </box>
    </Popover>
  );
}
