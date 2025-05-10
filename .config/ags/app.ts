import { App } from "astal/gtk3";
import style from "./style/style.scss";
import Bar from "./widget/Bar";
import NotificationPopups from "./widget/Notification/NotificationPopups";
import MediaWindow from "./widget/MediaWindow/MediaWindow";
import ControlMenu from "./widget/ControlMenu/ControlMenu";
import NotificationMenu from "./widget/NotificationMenu/NotificationMenu";

App.start({
  css: style,
  instanceName: "js",
  requestHandler(request, res) {
    print(request);
    res("ok");
  },
  main() {
    App.get_monitors().map(Bar);
    App.get_monitors().map(NotificationPopups);
    App.get_monitors().map(MediaWindow);
    App.get_monitors().map(ControlMenu);
    App.get_monitors().map(NotificationMenu);
  },
});
