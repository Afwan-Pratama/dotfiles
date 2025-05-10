import { Astal, Gtk, Gdk, App } from "astal/gtk3";
import SysTray from "./SysTray";
import Time from "./Time";
import Workspaces from "./Workspaces";
import Audio from "./Audio";
import MediaPlayer from "./MediaPlayer";
import { GLib } from "astal";

function AppMenu() {
  return <icon className="AppMenu" icon={GLib.get_os_info("LOGO") || "A"} />;
}

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      name="Bar"
      application={App}
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      anchor={LEFT | TOP | BOTTOM}
      margin-top={13}
      margin-bottom={13}
      margin-left={13}
    >
      <centerbox vertical>
        <box vertical vexpand valign={Gtk.Align.START}>
          <AppMenu />
          <Workspaces />
        </box>
        <box vertical>
          <Time />
          <MediaPlayer />
        </box>
        <box vertical vexpand valign={Gtk.Align.END}>
          <eventbox onClickRelease={() => App.toggle_window("control-menu")}>
            <Audio />
          </eventbox>
          <SysTray />
        </box>
      </centerbox>
    </window>
  );
}
