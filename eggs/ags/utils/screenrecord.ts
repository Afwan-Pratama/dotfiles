import GObject, { register } from "astal/gobject";
import { sh } from ".";

@register({ GTypeName: "Screenrecord" })
export default class ScreenRecord extends GObject.Object {
	static instance: ScreenRecord;

	static get_default() {
		if (!this.instance) this.instance = new ScreenRecord();
		return this.instance;
	}

	async screenshot(specify: string) {
		if (specify === "full") {
			await sh(`niri msg action screenshot-screen`);
		}
		if (specify === "window") {
			await sh(`niri msg action screenshot-window`)
		}
		if (specify === "partial") {
			await sh(`niri msg action screenshot`)
		}
	}
}
