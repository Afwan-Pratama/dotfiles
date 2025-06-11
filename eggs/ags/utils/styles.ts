import { GLib } from "astal";
import { writeFileAsync } from "astal";
import options from "../options";
import { bash } from ".";
import { App } from "astal/gtk4";
import { Opt } from "./option";

const { theme } = options;
const { window, bar } = theme;

type ThemeMode = "dark" | "light";
type ShorthandProperty = {
	top: number;
	right: number;
	bottom?: number;
	left?: number;
};

function shorthand(
	value: number | number[],
	length: number,
): ShorthandProperty {
	if (typeof value === "number") {
		return length <= 2
			? { top: value, right: value }
			: { top: value, right: value, bottom: value, left: value };
	}

	const [top, right = top, bottom = top, left = right] = value;
	return length <= 2 ? { top, right } : { top, right, bottom, left };
}

function applyOffsets(
	short: ShorthandProperty,
	element: typeof theme.bar | typeof theme.window,
) {
	const borderWidth = element.border_width.get();
	const shadowHOffset = element.shadow.offset.get()[0];
	const shadowVOffset = element.shadow.offset.get()[1];

	short.top += borderWidth + (shadowVOffset <= 0 ? Math.abs(shadowVOffset) : 0);
	short.right += borderWidth + (shadowHOffset > 0 ? shadowHOffset : 0);
	short.bottom! += borderWidth + (shadowVOffset > 0 ? shadowVOffset : 0);
	short.left! +=
		borderWidth + (shadowHOffset <= 0 ? Math.abs(shadowHOffset) : 0);

	return short;
}

function defineVar(opt: Opt, type = "string", slice = 2, arrayLength = 4) {
	const value = opt.get();

	const typeChecks = {
		number_only: (val: any) => typeof val === "number",
		number: (val: any) => typeof val === "number",
		string: (val: any) => typeof val === "string" || typeof val === "boolean",
		number_or_array: (val: any) =>
			typeof val === "number" || Array.isArray(val),
	};

	if (!typeChecks[type](value)) {
		throw new Error(
			`Invalid value, ${opt.id} needs ${type.split("_").join(" ")}`,
		);
	}

	let modifiedVal: Record<string, number> | string | unknown;
	switch (type) {
		case "number":
			modifiedVal = `${value}px`;
			break;
		case "number_or_array":
			let short = shorthand(value as number | number[], arrayLength);

			if (opt.id.startsWith("theme.window.margin")) {
				short = applyOffsets(short, window);
			}
			if (opt.id.startsWith("theme.bar.margin")) {
				const barPos = options.bar.position.get();
				short.left = barPos == "right" ? 0 : short.left;
				short.right = barPos == "left" ? 0 : short.right;
				short = applyOffsets(short, bar);
			}
			modifiedVal = Object.keys(short)
				.map((key) => `${short[key]}px`)
				.join(" ");
			break;
		default:
			modifiedVal = value;
			break;
	}

	const key = opt.id.split(".").slice(-slice).join("-").replace("_", "-");
	return `$${key}: ${modifiedVal};`;
}

async function initScss(mode: ThemeMode) {
	const targetDir = `${SRC}/styles/variables.scss`;
	const scss = `${SRC}/styles/styles.scss`;
	const css = `${GLib.get_tmp_dir()}/styles.css`;
	const colors = theme[mode];

	const scssVar = [
		defineVar(colors.bg, "string", 1),
		defineVar(colors.fg, "string", 1),
		defineVar(colors.accent, "string", 1),
		defineVar(colors.red, "string", 1),
		defineVar(window.opacity, "number_only"),
		defineVar(window.border_radius, "number_or_array"),
		defineVar(window.margin, "number_or_array"),
		defineVar(window.padding, "number_or_array"),
		defineVar(window.dock_padding, "number_or_array"),
		defineVar(window.desktop_clock_padding, "number_or_array"),
		defineVar(window.border_width, "number"),
		defineVar(window.border_color),
		defineVar(window.shadow.offset, "number_or_array", 3, 2),
		defineVar(window.shadow.blur, "number", 3),
		defineVar(window.shadow.spread, "number", 3),
		defineVar(window.shadow.color, "string", 3),
		defineVar(window.shadow.opacity, "number_only", 3),
		defineVar(options.bar.separator),
		defineVar(bar.border_radius, "number_or_array"),
		defineVar(bar.bg_color),
		defineVar(bar.opacity, "number_only"),
		defineVar(bar.margin, "number_or_array"),
		defineVar(bar.padding, "number_or_array"),
		defineVar(bar.border_width, "number"),
		defineVar(bar.border_color),
		defineVar(bar.shadow.offset, "number_or_array", 3, 2),
		defineVar(bar.shadow.blur, "number", 3),
		defineVar(bar.shadow.spread, "number", 3),
		defineVar(bar.shadow.color, "string", 3),
		defineVar(bar.shadow.opacity, "number_only", 3),
		defineVar(bar.button.bg_color, "string", 3),
		defineVar(bar.button.fg_color, "string", 3),
		defineVar(bar.button.opacity, "number_only", 3),
		defineVar(bar.button.padding, "number_or_array", 3),
		defineVar(bar.button.border_radius, "number_or_array", 3),
		defineVar(bar.button.border_width, "number", 3),
		defineVar(bar.button.border_color, "string", 3),
		defineVar(bar.button.shadow.offset, "number_or_array", 4, 2),
		defineVar(bar.button.shadow.blur, "number", 4),
		defineVar(bar.button.shadow.spread, "number", 4),
		defineVar(bar.button.shadow.color, "string", 4),
		defineVar(bar.button.shadow.opacity, "number_only", 4),
	];

	await writeFileAsync(targetDir, scssVar.join("\n")).catch(console.error);
	await bash(`sass ${scss} ${css}`);
	App.apply_css(css, true);
}

export default async function() {
	options.handler(["theme", "bar.position", "bar.separator"], async () => {
		const mode = options.theme.mode.get() as ThemeMode;
		await initScss(mode).catch(console.error);
	});

	const mode = options.theme.mode.get() as ThemeMode;
	await initScss(mode).catch(console.error);
}
