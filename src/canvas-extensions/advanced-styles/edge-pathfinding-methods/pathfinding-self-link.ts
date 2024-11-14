import {Canvas, Position, Side} from "src/@types/Canvas"
import EdgePathfindingMethod, {EdgePath} from "./edge-pathfinding-method"
import SvgPathHelper from "src/utils/svg-path-helper"
import AdvancedCanvasPlugin from "src/main"
import BBoxHelper from "src/utils/bbox-helper"
import CanvasHelper from "src/utils/canvas-helper"


export default class EdgePathfindingSelfLink extends EdgePathfindingMethod {
	getPath(_plugin: AdvancedCanvasPlugin, _canvas: Canvas, fromPos: Position, fromBBoxSidePos: Position, fromSide: Side, toPos: Position, toBBoxSidePos: Position, toSide: Side, _isDragging: boolean): EdgePath {
		const direction = BBoxHelper.direction(fromSide)
		const horizontalDirection = BBoxHelper.direction(toSide)
		const distance = CanvasHelper.GRID_SIZE * 2
		let pathArray : Position[] = [
			fromPos,
			{
				x : fromBBoxSidePos.x,
				y : fromBBoxSidePos.y + direction * distance
			},
			{
				x : toBBoxSidePos.x + horizontalDirection * distance,
				y : fromBBoxSidePos.y + direction * distance
			},
			{
				x : toBBoxSidePos.x + horizontalDirection * distance,
				y : toBBoxSidePos.y
			},
			toPos
		]
		let center : Position = {
			x : (pathArray[1].x + pathArray[2].x) / 2,
			y : (pathArray[1].y + pathArray[2].y) / 2
		}

		return {
			svgPath: SvgPathHelper.pathArrayToSvgPath(pathArray, false),
			center: center,
			rotateArrows: false
		}
	}
}
