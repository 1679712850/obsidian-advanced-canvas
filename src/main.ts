import {debounce, ItemView, Notice, Plugin} from 'obsidian'
import CanvasPatcher from './core/canvas-patcher'
import {BBox, Canvas, CanvasEdgeData, CanvasNode, CanvasView} from './@types/Canvas'

// Utils
import IconsHelper from './utils/icons-helper'
import DebugHelper from './utils/debug-helper'

// Managers
import SettingsManager from './settings'
import WindowsManager from './windows-manager'

// Canvas Extensions
import CanvasExtension from './core/canvas-extension'
import GroupCanvasExtension from './canvas-extensions/group-canvas-extension'
import PresentationCanvasExtension from './canvas-extensions/presentation-canvas-extension'
import BetterReadonlyCanvasExtension from './canvas-extensions/better-readonly-canvas-extension'
import EncapsulateCanvasExtension from './canvas-extensions/encapsulate-canvas-extension'
import CommandsCanvasExtension from './canvas-extensions/commands-canvas-extension'
import AutoResizeNodeCanvasExtension from './canvas-extensions/auto-resize-node-canvas-extension'
import PortalsCanvasExtension from './canvas-extensions/portals-canvas-extension'
import BetterDefaultSettingsCanvasExtension from './canvas-extensions/better-default-settings-canvas-extension'
import ColorPaletteCanvasExtension from './canvas-extensions/color-palette-canvas-extension'
import CollapsibleGroupsCanvasExtension from './canvas-extensions/collapsible-groups-canvas-extension'
import PropertiesCanvasExtension from './canvas-extensions/properties-canvas-extension'
import FocusModeCanvasExtension from './canvas-extensions/focus-mode-canvas-extension'

// Advanced Styles
import NodeStylesExtension from './canvas-extensions/advanced-styles/node-styles'
import EdgeStylesExtension from './canvas-extensions/advanced-styles/edge-styles'

// Dataset Exposers
import NodeInteractionExposerExtension from './canvas-extensions/dataset-exposers/node-interaction-exposer'
import NodeExposerExtension from './canvas-extensions/dataset-exposers/node-exposer'
import EdgeExposerExtension from './canvas-extensions/dataset-exposers/edge-exposer'
import CanvasWrapperExposerExtension from './canvas-extensions/dataset-exposers/canvas-wrapper-exposer'
import MigrationHelper from './utils/migration-helper'
import {around} from "monkey-around";
import {NodeSide} from "obsidian/canvas";
import {
	NodeSelfConnectionCanvasExtension
} from "./canvas-extensions/node-self-connection-canvas-extension";

const CANVAS_EXTENSIONS: typeof CanvasExtension[] = [
	// Dataset Exposers
	CanvasWrapperExposerExtension,
	NodeExposerExtension,
	EdgeExposerExtension,
	NodeInteractionExposerExtension,

	// Advanced Styles
	NodeStylesExtension,
	EdgeStylesExtension,

	// Basic Extensions
	BetterDefaultSettingsCanvasExtension,
	CommandsCanvasExtension,
	BetterReadonlyCanvasExtension,
	AutoResizeNodeCanvasExtension,
	PropertiesCanvasExtension,
	GroupCanvasExtension,

	// More Advanced Extensions
	CollapsibleGroupsCanvasExtension,
	FocusModeCanvasExtension,
	EncapsulateCanvasExtension,
	ColorPaletteCanvasExtension,
	PresentationCanvasExtension,
	PortalsCanvasExtension,
	NodeSelfConnectionCanvasExtension
]

export default class AdvancedCanvasPlugin extends Plugin {
	migrationHelper: MigrationHelper
	debugHelper: DebugHelper

	settings: SettingsManager
	windowsManager: WindowsManager

	canvasPatcher: CanvasPatcher
	canvasExtensions: CanvasExtension[]
	public patchedEdge: boolean;


	async onload() {
		this.migrationHelper = new MigrationHelper(this)
		await this.migrationHelper.migrate()

		IconsHelper.addIcons()

		this.settings = new SettingsManager(this)
		await this.settings.loadSettings()
		this.settings.addSettingsTab()

		this.windowsManager = new WindowsManager(this)

		this.canvasPatcher = new CanvasPatcher(this)
		this.canvasExtensions = CANVAS_EXTENSIONS.map((Extension: any) => new Extension(this))

		this.app.workspace.onLayoutReady(() => {
			this.patchCanvasNamedColorMenu();
		});
	}

	onunload() {
	}

	getCurrentCanvasView(): CanvasView | null {
		const canvasView = this.app.workspace.getActiveViewOfType(ItemView)
		if (canvasView?.getViewType() !== 'canvas') return null
		return canvasView as CanvasView
	}

	getCurrentCanvas(): Canvas | null {
		return this.getCurrentCanvasView()?.canvas || null
	}

	createFileSnapshot(path: string, content: string) {
		const fileRecoveryPlugin = this.app.internalPlugins.plugins['file-recovery']?.instance
		if (!fileRecoveryPlugin) return

		fileRecoveryPlugin.forceAdd(path, content)
	}

	// this.app.plugins.plugins["advanced-canvas"].enableDebugMode()
	enableDebugMode() {
		if (this.debugHelper) return
		this.debugHelper = new DebugHelper(this)
	}

	private patchCanvasNamedColorMenu() {
		const app = this.app;
		const settings = this.settings;
		const patchMenu = () => {
			// 获取canvasView
			const canvasView = this.getCurrentCanvasView();
			if (!canvasView)
				return false;
			// 获取菜单
			const menu = (canvasView as CanvasView)?.canvas.menu;
			if (!menu)
				return false;
			// 获取选中项
			if (!menu.selection)
				return false;
			const menuUninstaller = around(menu.constructor.prototype, {
				render: (next: any) => function (...args: any) {
					const result = next.call(this, ...args);
					// 获取当前激活的视图
					const maybeCanvasView = app.workspace.getActiveViewOfType(ItemView) as CanvasView | null;
					if (!maybeCanvasView || maybeCanvasView.canvas?.selection?.size !== 1)
						return result

					// 防止多次更新生成多次
					if (this.menuEl.querySelector(".canvas-named-color-menu-item")) {
						return result;
					}

					// 获取选中节点
					const selectedNode = Array.from(maybeCanvasView.canvas?.selection)[0];
					// 箭头添加menu的地方
					// 预设颜色菜单
					// 根据配置中的设置来添加预设
					const ColorMenu = this.menuEl.children[1]
					const canvas = maybeCanvasView.canvas
					// 设置颜色
					const setColor = function (color : string){
						const allSelections = Array.from(canvas.selection)
						for (const index in allSelections) {
							const selection = allSelections[index];
							selection.setColor(color)
						}
						canvas.requestSave();
					};
					let desiredColorMenu: HTMLElement | null = null
					if (!ColorMenu)
						return
					ColorMenu.addEventListener("click", () => {
						if (desiredColorMenu) {
							desiredColorMenu.remove()
							desiredColorMenu = null
							return
						}
						// 连线
						let selections;
						if (selectedNode.from) {
							selections = settings.getSetting("lineNamedColors");
						} else {
							selections = settings.getSetting("nodeNamedColors");
						}
						if (selections.length == 0)
							return;
						desiredColorMenu = this.menuEl.createEl("div", {cls: "canvas-named-canvas-submenu"})
						// 添加预设颜色按钮
						const addPreButton = function (text = "预设", color = "1") {
							if (!desiredColorMenu)
								return
							const t = desiredColorMenu.createEl("button", {cls: "clickable-icon"});
							t.createEl("div", {text: text});
							t.addClass("mod-canvas-color-desirec");
							t.addEventListener("click", (function () {
								return setColor(color)
							}));
						};
						for (const i in selections) {
							const r = selections[i]
							addPreButton(r["name"], r["color"])
						}
					})
					return result;
				}
			});
			this.register(menuUninstaller);
			this.app.workspace.trigger("collapse-node:patched-canvas");
			return true;
		};
		this.app.workspace.onLayoutReady(() => {
			if (!patchMenu()) {
				const evt = this.app.workspace.on("layout-change", () => {
					patchMenu() && this.app.workspace.offref(evt);
				});
				this.registerEvent(evt);
			}
		});
	}
}
