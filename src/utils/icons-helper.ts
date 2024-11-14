import {addIcon} from "obsidian"

const CUSTOM_ICONS = {
	'shape-pill': `<rect rx="31.25" height="62.5" width="93.75" y="18.75" x="3.125" stroke-width="8.333" stroke="currentColor" fill="transparent"/>`,
	'shape-parallelogram': `<rect transform="skewX(-20)" rx="5" height="50" width="70" y="25" x="35" stroke-width="8.333" stroke="currentColor" fill="transparent"/>`,
	'shape-predefined-process': `
    <g stroke-width="2" stroke="currentColor" fill="none" transform="matrix(4.166667,0,0,4.166667,0,0)">
      <path d="M 4.999687 3 L 19.000312 3 C 20.104688 3 21 3.895312 21 4.999687 L 21 19.000312 C 21 20.104688 20.104688 21 19.000312 21 L 4.999687 21 C 3.895312 21 3 20.104688 3 19.000312 L 3 4.999687 C 3 3.895312 3.895312 3 4.999687 3 Z M 4.999687 3 "/>
      <path d="M 7 3 L 7 21 "/>
      <path d="M 17 3 L 17 21 "/>
    </g>
  `,
	'shape-document': `<path transform="translate(0, 5)" stroke="currentColor" fill="none" stroke-width="8.333" d="M83.75 25C85.82 25 87.5 26.68 87.5 28.75L87.5 64.375Q68.75 54.25 50 64.375 31.25 74.5 12.5 64.375L12.5 30.625 12.5 28.75C12.5 26.68 14.18 25 16.25 25Z"/>`,
	'shape-database': `
    <g transform="translate(20, 20)" stroke-width="8.333" stroke="currentColor" fill="none">
      <path d="M 1 51 L 1 11 C 1 5.48 14.43 1 31 1 C 47.57 1 61 5.48 61 11 L 61 51 C 61 56.52 47.57 61 31 61 C 14.43 61 1 56.52 1 51 Z"/>
      <path d="M 1 11 C 1 16.52 14.43 21 31 21 C 47.57 21 61 16.52 61 11"/>
    </g>
  `,

	'border-solid': `<path stroke="currentColor" fill="none" stroke-width="8.333" d="M91.6667 45.8333v4.1667c0 2.0833-2.0833 4.1667-4.1667 4.1667H12.5c-2.0833 0-4.1667-2.0833-4.1667-4.1667v-4.1667"/>`,
	'border-dashed': `<path stroke="currentColor" fill="none" stroke-width="8.333" stroke-dasharray="13.7" d="M91.6667 45.8333v4.1667c0 2.0833-2.0833 4.1667-4.1667 4.1667H12.5c-2.0833 0-4.1667-2.0833-4.1667-4.1667v-4.1667"/>`,
	'border-dotted': `<path stroke="currentColor" fill="none" stroke-width="8.333" stroke-dasharray="8.7" d="M91.6667 45.8333v4.1667c0 2.0833-2.0833 4.1667-4.1667 4.1667H12.5c-2.0833 0-4.1667-2.0833-4.1667-4.1667v-4.1667"/>`,

	'path-solid': `<path stroke="currentColor" fill="none" stroke-width="8.5" d="M37.5 79.1667h35.4167a14.5833 14.5833 90 000-29.1667h-45.8333a14.5833 14.5833 90 010-29.1667H62.5"/>`,
	'path-dotted': `<path stroke="currentColor" fill="none" stroke-width="8.5" stroke-dasharray="8.8" d="M37.5 79.1667h35.4167a14.5833 14.5833 90 000-29.1667h-45.8333a14.5833 14.5833 90 010-29.1667H62.5"/>`,
	'path-short-dashed': `<path stroke="currentColor" fill="none" stroke-width="8.5" stroke-dasharray="15" d="M37.5 79.1667h35.4167a14.5833 14.5833 90 000-29.1667h-45.8333a14.5833 14.5833 90 010-29.1667H62.5"/>`,
	'path-long-dashed': `<path stroke="currentColor" fill="none" stroke-width="8.5" stroke-dasharray="23" d="M37.5 79.1667h35.4167a14.5833 14.5833 90 000-29.1667h-45.8333a14.5833 14.5833 90 010-29.1667H62.5"/>`,

	'arrow-triangle': `<path stroke="currentColor" fill="currentColor" d="M 15 10 L 85 50 L 15 90 Z"/>`,
	'arrow-triangle-outline': `<path stroke="currentColor" stroke-width="8.5" fill="none" d="M 15 10 L 85 50 L 15 90 Z"/>`,
	'arrow-thin-triangle': `<path stroke="currentColor" stroke-width="8.5" fill="none" d="M 15 10 L 85 50 L 15 90"/>`,
	'arrow-halved-triangle': `<path stroke="currentColor" fill="currentColor" d="M 15 50 L 85 50 L 15 90 Z"/>`,
	'arrow-diamond': `<path stroke="currentColor" fill="currentColor" d="M 50 0 L 100 50 L 50 100 L 0 50 Z"/>`,
	'arrow-diamond-outline': `<path stroke="currentColor" stroke-width="8.5" fill="none" d="M 50 0 L 100 50 L 50 100 L 0 50 Z"/>`,
	'arrow-circle': `<circle stroke="currentColor" fill="currentColor" cx="50" cy="50" r="45"/>`,
	'arrow-circle-outline': `<circle stroke="currentColor" stroke-width="8.5" fill="none" cx="50" cy="50" r="45"/>`,

	'pathfinding-method-bezier': `<path stroke="currentColor" fill="none" stroke-width="8.5" d="M37.5 79.1667h35.4167a14.5833 14.5833 90 000-29.1667h-45.8333a14.5833 14.5833 90 010-29.1667H62.5"/>`,
	'pathfinding-method-square': `<path stroke="currentColor" fill="none" stroke-width="8.5" d="M72.9167 79.1667 72.9167 50 27.0833 50 27.0833 20.8333"/>`,
	'self-connection' : `<svg class="icon" viewBox="0 0 1024 1024" width="100" height="100"><path fill="currentColor" d="M941.81348693 705.7113088l-1.24627626-1.2091392-54.0409856-52.72917333-44.51314347-43.44272214-4.13313707-4.03810986c-2.38987947-1.7104896-5.0757632-2.78309547-7.98665386-2.78309547-9.388032 0-16.98911573 10.1515264-16.98911574 22.6885632v61.58199467h-54.22994773a76.45866667 76.45866667 0 0 1-66.21538987-38.22933334l-5.06484053-8.7719936 0.18786987 0.03495254-234.6647552-406.4509952-0.00109227-0.00109227-0.00109227-0.00109227c-27.31649707-47.31153067-77.7977856-76.45538987-132.4285952-76.45538986h-58.33796266c-15.08857173-34.9077504-49.82483627-59.33847893-90.2725632-59.33847894-54.29220693 0-98.304 44.01179307-98.304 98.304s44.01179307 98.304 98.304 98.304c41.01352107 0 76.15501653-25.1199488 90.89406293-60.8108544h57.71646293a76.45866667 76.45866667 0 0 1 63.78728107 34.31355734l241.9687424 419.10272 0.00109227 0.00109226 0.00109226 0.00109227c27.31649707 47.31153067 77.7977856 76.45538987 132.4285952 76.45538987h54.22994774v60.48863573c0 12.52283733 7.602176 22.6885632 16.98911573 22.6885632 3.37619627 0 6.504448-1.3631488 9.1521024-3.6175872 0.3735552-0.3145728 0.71325013-0.68048213 1.06496-1.02673067l46.4289792-45.318144 54.0278784-52.6942208 1.28232107-1.25719893c4.00861867-4.14405973 6.63661227-10.5742336 6.63661226-17.88040533-0.0131072-7.3203712-2.64000853-13.76474453-6.6715648-17.90880427z m-769.93768106-472.612864c-21.11351467 0-38.22933333-17.11581867-38.22933334-38.22933333s17.11581867-38.22933333 38.22933334-38.22933334 38.22933333 17.11581867 38.22933333 38.22933334-17.11581867 38.22933333-38.22933333 38.22933333z"></path></svg>`,
	'top-left' : `<svg  class="icon" viewBox="0 0 1024 1024" width="100" height="100"><path fill="currentColor" d="M341.333333 401.066667V597.333333H256V256h341.333333v85.333333H401.066667l392.533333 392.533334-59.733333 59.733333L341.333333 401.066667z"></path></svg>`,
	'top-right' : `<svg  class="icon" viewBox="0 0 1024 1024" width="100" height="100"><path fill="currentColor" d="M708.266667 401.066667V597.333333h85.333333V256h-341.333333v85.333333h196.266666L256 733.866667l59.733333 59.733333 392.533334-392.533333z"></path></svg>`,
	'bottom-left' : `<svg class="icon" viewBox="0 0 1024 1024" width="100" height="100"><path fill="currentColor" d="M341.333333 648.533333v-196.266666H256v341.333333h341.333333v-85.333333H401.066667l392.533333-392.533334L733.866667 256 341.333333 648.533333z"></path></svg>`,
	'bottom-right' : `<svg class="icon" viewBox="0 0 1024 1024" width="100" height="100"><path fill="currentColor" d="M708.266667 648.533333v-196.266666h85.333333v341.333333h-341.333333v-85.333333h196.266666L256 315.733333 315.733333 256l392.533334 392.533333z"></path></svg>`,
}

export default class IconsHelper {
	static addIcons() {
		for (const [id, svg] of Object.entries(CUSTOM_ICONS)) {
			addIcon(id, svg)
		}
	}
}
