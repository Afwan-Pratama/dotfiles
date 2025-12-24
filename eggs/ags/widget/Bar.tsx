import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date")
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  function Start() {
    return (
      <box orientation={Gtk.Orientation.VERTICAL} >

      </box>
    )
  }

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={LEFT | TOP | BOTTOM}
      application={app}
    >
      <centerbox cssName="centerbox">
        <button
          $type="start"
          onClicked={() => execAsync("echo hello").then(console.log)}
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <label label="Welcome to AGS!" />
        </button>
        <box $type="center" />
        <menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
          <label label={time} />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </centerbox>
    </window>
  )
}
