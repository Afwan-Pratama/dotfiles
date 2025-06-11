import AstalNetwork from "gi://AstalNetwork";
import { qsPage } from "../QSWindow";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";
import { bash } from "../../../utils";

export default function WifiPage() {
  const wifi = AstalNetwork.get_default().wifi;

  return (
    <box
      name={"wifi"}
      cssClasses={["wifi-page", "qs-page"]}
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
        <label label={"Wi-Fi"} hexpand xalign={0} />
      </box>
      <Gtk.Separator />
      <Gtk.ScrolledWindow vexpand>
        <box vertical spacing={6}>
          {bind(wifi, "accessPoints").as((aps) => {
            const seenSsids = new Set();
            return aps
              .filter((ap) => {
                if (seenSsids.has(ap.ssid)) {
                  return false;
                }
                seenSsids.add(ap.ssid);
                return !!ap.ssid;
              })
              .map((accessPoint) => {
                return (
                  <button
                    cssClasses={bind(wifi, "ssid").as((ssid) => {
                      const classes = ["button"];
                      ssid === accessPoint.ssid && classes.push("active");
                      return classes;
                    })}
                    onClicked={() => {
                      bash(`nmcli device wifi connect ${accessPoint.bssid}`);
                    }}
                  >
                    <box>
                      <image iconName={accessPoint.iconName} />
                      <label label={accessPoint.ssid} />
                    </box>
                  </button>
                );
              });
          })}
        </box>
      </Gtk.ScrolledWindow>
    </box>
  );
}
