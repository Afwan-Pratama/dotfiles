import { Variable, GLib } from "astal";
import { App } from "astal/gtk3";

export default function Time({ hour = "%H", min = "%M" }) {
  const hourTime = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(hour)!,
  );
  const minTime = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(min)!,
  );

  return (
    <eventbox
      onClick={() => {
        App.toggle_window("calendar-window");
      }}
    >
      <box className="Time" vertical>
        <label
          className="Hour"
          onDestroy={() => hourTime.drop()}
          label={hourTime()}
        />
        <label css="font-size:20px" label="-" />
        <label
          className="Minute"
          onDestroy={() => minTime.drop()}
          label={minTime()}
        />
      </box>
    </eventbox>
  );
}
