import { bind, Variable } from "astal";
import { ButtonProps } from "astal/gtk3/widget";
import AstalHyprland from "gi://AstalHyprland?version=0.1";

type WorkspacesProps = ButtonProps & {
  ws: AstalHyprland.Workspace;
};

function WorkspaceButton({ ws, ...props }: WorkspacesProps) {
  const hypr = AstalHyprland.get_default();

  const classWorkspace: Variable<string> = Variable.derive(
    [bind(hypr, "focusedWorkspace"), bind(hypr, "clients")],
    (fws, _) => {
      if (fws.id == ws.id) {
        return "active";
      }
      if (hypr.get_workspace(ws.id)?.get_clients().length > 0) {
        return "occupied";
      }
      return "";
    },
  );

  return (
    <button
      className={classWorkspace()}
      onClicked={() => ws.focus()}
      {...props}
    >
      <label label="O" />
    </button>
  );
}

export default function Workspaces() {
  return (
    <box vertical className="Workspaces">
      {Array.from({ length: 9 }, (_, i) => i).map((i) => (
        <WorkspaceButton ws={AstalHyprland.Workspace.dummy(i + 1, null)} />
      ))}
    </box>
  );
}
