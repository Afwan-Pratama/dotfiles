import GObject, { register, property } from "astal/gobject"
import { exec, subprocess } from "astal/process"

const get = (args: string) => JSON.parse(exec(`niri msg -j ${args}`))
const action = (args: string) => exec(`niri msg action ${args}`)

export type WindowProps = {
	id: number,
	title: string,
	app_id: string,
	pid: number,
	workspace_id: number,
	is_focused: boolean,
	is_floating: boolean,
	is_urgent: boolean
}

export type WorkspaceProps = {
	id: number,
	idx: number,
	name: string | null,
	output: string,
	is_urgent: boolean,
	is_active: boolean,
	is_focused: boolean,
	active_window_id: number | null
}

export type OverviewStateProps = {
	is_open: boolean,
}

@register({ GTypeName: "Niri" })
export class Niri extends GObject.Object {
	static instance: Niri
	static get_default() {
		if (!this.instance)
			this.instance = new Niri()

		return this.instance
	}

	#focusedWindow: WindowProps = get(`focused-window`)
	#workspaces: Array<WorkspaceProps> = get(`workspaces`)
	#windows: Array<WindowProps> = get(`windows`)
	#overviewState: OverviewStateProps = get(`overview-state`)

	@property(Object)
	get focusedWindow() { return this.#focusedWindow }

	@property(Object)
	get workspaces() { return this.#workspaces }

	@property(Object)
	get windows() { return this.#windows }

	@property(Object)
	get overviewState() { return this.#overviewState }


	// set screen(percent) {
	// 	if (percent < 0)
	// 		percent = 0
	//
	// 	if (percent > 1)
	// 		percent = 1
	//
	// 	execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
	// 		this.#screen = percent
	// 		this.notify("screen")
	// 	})
	// }

	focusWorkspace(idx: number) {
		action(`focus-workspace ${idx}`)
	}

	focusWindow(id: number) {
		action(`focus-window --id ${id}`)
	}

	constructor() {
		super()

		subprocess('niri msg event-stream ', async _ => {
			this.#focusedWindow = get(`focused-window`)
			this.#workspaces = get(`workspaces`)
			this.#windows = get(`windows`)
			this.#overviewState = get(`overview-state`)
			this.notify("focused-window")
			this.notify("windows")
			this.notify("workspaces")
			this.notify("overview-state")
		})

	}
}
