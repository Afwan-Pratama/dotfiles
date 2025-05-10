import { bind } from "astal";
import { App, Astal } from "astal/gtk3";
import Mpris from "gi://AstalMpris";

const mediaPlayer = Mpris.get_default();

export default function MediaPlayer() {
  return (
    <>
      {bind(mediaPlayer, "players").as((ps) =>
        ps[0] ? (
          <box vertical className="MediaPlayer">
            <button
              visible={bind(ps[0], "canGoPrevious").as((v) => v)}
              onClick={() => ps[0].previous()}
            >
              <icon icon={"media-skip-backward-symbolic"} />
            </button>
            <button onClick={() => ps[0].play_pause()}>
              <icon
                icon={bind(ps[0], "playbackStatus").as((playback) =>
                  playback == 0
                    ? "media-playback-pause-symbolic"
                    : "media-playback-start-symbolic",
                )}
              />
            </button>
            <button
              visible={bind(ps[0], "canGoNext").as((v) => v)}
              onClick={() => ps[0].next()}
            >
              <icon icon={"media-skip-forward-symbolic"} />
            </button>
            <button onClicked={() => App.toggle_window("media-window")}>
              <icon
                icon={bind(ps[0], "entry").as((entry: string) =>
                  Astal.Icon.lookup_icon(ps[0].entry)
                    ? `${entry}`
                    : "audio-x-generic-symbolic",
                )}
              />
            </button>
          </box>
        ) : (
          <box />
        ),
      )}
    </>
  );
}
