import { App } from "astal/gtk4";
import { time } from "../../utils";
import PanelButton from "../common/PanelButton";
import { WINDOW_NAME } from "../datemenu/DateMenu";

export default function TimePanelButton() {
	return (
		<PanelButton
			window={WINDOW_NAME}
			onClicked={() => App.toggle_window(WINDOW_NAME)}
		>
			<box vertical>
				<label cssClasses={["label"]} label={time((t) => t.format("%H")!)} />
				<label cssClasses={["label"]} label="-" />
				<label cssClasses={["label"]} label={time((t) => t.format("%M")!)} />
			</box>
		</PanelButton>
	);
}
