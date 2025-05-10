import { Astal, Gtk } from "astal/gtk3";
import Calendar from "../Calendar";
import Popover from "../Popover";
import Notifd from "gi://AstalNotifd";
import { bind, GLib } from "astal";
import { weatherApi } from "../../utils/weather";

const notifd = Notifd.get_default();

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

const ClearAllNotifications = () => {
  for (const notification of notifd.get_notifications()) {
    notification.dismiss();
  }
};

type NotificationProps = {
  notification: Notifd.Notification;
};

function NotificationContainer(props: NotificationProps) {
  const { notification: n } = props;

  return (
    <box vertical>
      <box hexpand>
        {(n.appIcon || n.desktopEntry) && (
          <icon
            visible={Boolean(n.appIcon || n.desktopEntry)}
            icon={n.appIcon || n.desktopEntry}
          />
        )}
        <label label={n.appName} />
        <button onClick={() => n.dismiss()} halign={Gtk.Align.END}>
          <icon icon="stock_close" />
        </button>
      </box>
      <box>
        {n.image && fileExists(n.image) && (
          <box
            valign={Gtk.Align.START}
            className="image"
            css={`
              background-image: url("${n.image}");
            `}
          />
        )}
        {n.image && isIcon(n.image) && (
          <box expand={false} valign={Gtk.Align.START} className="icon-image">
            <icon
              icon={n.image}
              expand
              halign={Gtk.Align.CENTER}
              valign={Gtk.Align.CENTER}
            />
          </box>
        )}
        <box vertical>
          <label label={n.summary} />
          <label label={n.body} />
        </box>
      </box>
      {n.actions.length > 0 &&
        n.actions.map((a) => (
          <button onClick={() => n.invoke(a.id)}>
            <label label={a.label} />
          </button>
        ))}
    </box>
  );
}

export default function NotificationMenu() {
  return (
    <Popover marginLeft={70} halign={Gtk.Align.START} name="calendar-window">
      <box className="NotificationMenu" spacing={30}>
        <box vertical>
          <Calendar css={"padding: 10px;border-radius: 10px;"} />
          <label label={weatherApi((v) => v.city)} />
          <icon icon={weatherApi((v) => "weather-" + v.main.toLowerCase())} />
          <label label={weatherApi((v) => v.main.toUpperCase())} />
          <label label={weatherApi((v) => v.desc.toUpperCase())} />
        </box>
        <box vertical>
          <centerbox hexpand valign={Gtk.Align.START}>
            <label halign={Gtk.Align.CENTER} label="Notifications" />
            <button
              halign={Gtk.Align.END}
              visible={bind(notifd, "notifications").as((v) => v.length > 0)}
              onClick={() => ClearAllNotifications()}
            >
              <icon icon="trash-empty" />
            </button>
          </centerbox>
          <scrollable heightRequest={500} widthRequest={500}>
            <box vertical>
              {bind(notifd, "notifications").as((arr) =>
                arr.map((n) => <NotificationContainer notification={n} />),
              )}
            </box>
          </scrollable>
        </box>
      </box>
    </Popover>
  );
}
