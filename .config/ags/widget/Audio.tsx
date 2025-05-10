import { bind, Binding, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Wp from "gi://AstalWp";

const speaker = Wp.get_default()?.audio.defaultSpeaker!;

const microphone = Wp.get_default()?.audio.defaultMicrophone!;

const visibleSlideSpeaker = Variable(false);

const visibleSlideMicrophone = Variable(false);

type AudioSliderBoxProps = {
  audioLabel: Binding<string>;
  revealSlide: Binding<boolean>;
};

export default function Audio() {
  return (
    <box vertical className="Audio">
      <box
        vertical
        visible={bind(microphone, "mute").as((v) => !v)}
        valign={Gtk.Align.CENTER}
        className="AudioMicrophone"
      >
        <AudioSliderBox
          audioLabel={bind(microphone, "volume").as((mcrp) => {
            return Math.floor(mcrp * 100).toString();
          })}
          revealSlide={visibleSlideMicrophone((v) => v)}
        />
        <button
          onHover={() => visibleSlideMicrophone.set(true)}
          onHoverLost={() => visibleSlideMicrophone.set(false)}
        >
          <icon icon={bind(microphone, "volumeIcon")} />
        </button>
      </box>
      <box vertical valign={Gtk.Align.CENTER} className="AudioSpeaker">
        <AudioSliderBox
          audioLabel={bind(speaker, "volume").as((spkr) => {
            return Math.floor(spkr * 100).toString();
          })}
          revealSlide={visibleSlideSpeaker((v) => v)}
        />
        <button
          onHover={() => visibleSlideSpeaker.set(true)}
          onHoverLost={() => visibleSlideSpeaker.set(false)}
        >
          <icon icon={bind(speaker, "volumeIcon")} />
        </button>
      </box>
    </box>
  );
}

function AudioSliderBox({ audioLabel, revealSlide }: AudioSliderBoxProps) {
  return (
    <revealer
      revealChild={revealSlide}
      transitionDuration={500}
      transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
    >
      <box className="AudioBox" vertical>
        <label label={audioLabel} />
      </box>
    </revealer>
  );
}
