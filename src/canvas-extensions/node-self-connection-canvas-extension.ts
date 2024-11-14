import {AdvancedCanvasPluginSettings} from "src/settings";
import CanvasExtension from "../core/canvas-extension";
import {ItemView, setIcon, Side} from "obsidian";
import {Canvas, CanvasEdgeData, CanvasNode} from "../@types/Canvas";
import {CanvasEvent} from "../core/events";
import CanvasHelper from "../utils/canvas-helper";
import {BUILTIN_NODE_STYLE_ATTRIBUTES} from "./advanced-styles/style-config";

interface SelfConnectionStyleAttributeOption {
	datasetKey: string
	icon: string
	label: string
	value: Side[]
}

const BUILTIN_SELF_CONNECTION_STYLE_ATTRIBUTES = [
	{
		datasetKey: "top-left",
		icon: "top-left",
		label: "Top Left",
		value: ["top", "left"]
	},
	{
		datasetKey: "top-right",
		icon: "top-right",
		label: "Top Right",
		value: ["top", "right"]
	},
	{
		datasetKey: "bottom-left",
		icon: "bottom-left",
		label: "Bottom Left",
		value: ["bottom", "left"]
	},
	{
		datasetKey: "bottom-right",
		icon: "bottom-right",
		label: "Bottom Right",
		value: ["bottom", "right"]
	}
] as SelfConnectionStyleAttributeOption[];

export class NodeSelfConnectionCanvasExtension extends CanvasExtension {
	// Todo:使用项目设置
	isEnabled(): boolean | keyof AdvancedCanvasPluginSettings {
		return true;
	}

	init(): void {
		this.plugin.registerEvent(this.plugin.app.workspace.on(
			CanvasEvent.PopupMenuCreated,
			(canvas: Canvas) => this.updatePopupMenu(canvas)
		))
	}

	private updatePopupMenu(canvas: Canvas) {
		if (canvas.readonly) return

		const selectedNodes = [...canvas.selection].filter(element => {
			const elementData = element.getData()
			return elementData.type === 'text'
		}) as CanvasNode[]
		if (selectedNodes.length === 0)
			return;

		const menuOption = CanvasHelper.createExpandablePopupMenuOption({
			id: `menu-option-self-connection`,
			label: "Self Connection",
			icon: "self-connection",
		}, BUILTIN_SELF_CONNECTION_STYLE_ATTRIBUTES.map((styleOption) => ({
			label: styleOption.label,
			icon: styleOption.icon,
			callback: () => {
				const selection = canvas.selection;
				const currentData = canvas.getData();
				// @ts-ignore
				const selectionNodes = Array.from(selection);
				if (selectionNodes.length === 0) return;

				const allEdgesData: CanvasEdgeData[] = [];
				selectionNodes.forEach((node) => {
					const newEdge = this.createEdge(node,node,styleOption.value);
					allEdgesData.push(newEdge);
				});

				currentData.edges = [
					...currentData.edges,
					...allEdgesData,
				];

				canvas.setData(currentData);
				canvas.requestSave();

				// Close menu
				menuOption.dispatchEvent(new Event('click'))
			}
		})))

		// Add menu option to menu bar
		CanvasHelper.addPopupMenuOption(canvas, menuOption)
	}

	private createEdge(node1: any, node2: any,sides : Side[]) {
		const random = (e: number) => {
			let t = [];
			for (let n = 0; n < e; n++) {
				t.push((16 * Math.random() | 0).toString(16));
			}
			return t.join("");
		};

		const edgeData: CanvasEdgeData = {
			id: random(16),
			fromSide: sides[0],
			fromNode: node1.id,
			toSide: sides[1],
			toNode: node2.id,
			styleAttributes : {
				pathfindingMethod : "self-link"
			}
		};
		console.log(edgeData)
		return edgeData;
	}
}
