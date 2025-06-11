import { Gtk } from "astal/gtk4";
import { bind } from "astal";
import { ButtonProps } from "astal/gtk4/widget";
import { Niri, WorkspaceProps } from "../../utils/niri";

type WsButtonProps = ButtonProps & {
	ws: WorkspaceProps;
};

const niri = Niri.get_default();

function WorkspaceButton({ ws, ...props }: WsButtonProps) {
	let classNames = ["workspace-button"];

	const active = ws.is_active
	active && classNames.push("active");

	const occupied = ws.active_window_id != null
	occupied && classNames.push("occupied")

	return (
		<button
			cssClasses={classNames}
			valign={Gtk.Align.CENTER}
			halign={Gtk.Align.CENTER}
			onClicked={() => niri.focusWorkspace(ws.idx)}
			{...props}
		/>
	);
}

export default function WorkspacesPanelButton() {
	return (
		<box vertical cssClasses={["workspace-container"]} spacing={4}>
			{bind(niri, "workspaces").as(v => v.sort((a, b) => a.idx - b.idx).map((ws) => (
				<WorkspaceButton ws={ws} />
			)))}
		</box>
	);
}
