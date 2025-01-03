import { CanvasNodeType } from "src/@types/Canvas"

export interface StyleAttributeOption {
  icon: string
  label: string
  value: string | null // The element with the null value is the default
}

export interface StyleAttribute {
  datasetKey: string
  label: string
  nodeTypes?: CanvasNodeType[]
  options: StyleAttributeOption[]
}

export const BUILTIN_NODE_STYLE_ATTRIBUTES = [
  {
    datasetKey: 'textAlign',
    label: 'Text Alignment',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'align-left',
        label: 'Left (default)',
        value: null
      },
      {
        icon: 'align-center',
        label: 'Center',
        value: 'center'
      },
      {
        icon: 'align-right',
        label: 'Right',
        value: 'right'
      }
    ]
  },
  {
    datasetKey: 'shape',
    label: 'Shape',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'rectangle-horizontal',
        label: 'Round Rectangle (default)',
        value: null
      },
      {
        icon: 'shape-pill',
        label: 'Pill',
        value: 'pill'
      },
      {
        icon: 'diamond',
        label: 'Diamond',
        value: 'diamond'
      },
      {
        icon: 'shape-parallelogram',
        label: 'Parallelogram',
        value: 'parallelogram'
      },
      {
        icon: 'circle',
        label: 'Circle',
        value: 'circle'
      },
      {
        icon: 'shape-predefined-process',
        label: 'Predefined Process',
        value: 'predefined-process'
      },
      {
        icon: 'shape-document',
        label: 'Document',
        value: 'document'
      },
      {
        icon: 'shape-database',
        label: 'Database',
        value: 'database'
      }
    ]
  },
  {
    datasetKey: 'border',
    label: 'Border',
    options: [
      {
        icon: 'border-solid',
        label: 'Solid (default)',
        value: null
      },
      {
        icon: 'border-dashed',
        label: 'Dashed',
        value: 'dashed'
      },
      {
        icon: 'border-dotted',
        label: 'Dotted',
        value: 'dotted'
      },
      {
        icon: 'eye-off',
        label: 'Invisible',
        value: 'invisible'
      }
    ]
  }
] as StyleAttribute[]

export const BUILTIN_EDGE_STYLE_ATTRIBUTES = [
  {
    datasetKey: 'path',
    label: 'Path Style',
    options: [
      {
        icon: 'path-solid',
        label: 'Solid (default)',
        value: null
      },
      {
        icon: 'path-dotted',
        label: 'Dotted',
        value: 'dotted'
      },
      {
        icon: 'path-short-dashed',
        label: 'Short Dashed',
        value: 'short-dashed'
      },
      {
        icon: 'path-long-dashed',
        label: 'Long Dashed',
        value: 'long-dashed'
      }
    ]
  },
  {
    datasetKey: 'arrow',
    label: 'Arrow Style',
    options: [
      {
        icon: 'arrow-triangle',
        label: 'Triangle (default)',
        value: null
      },
      {
        icon: 'arrow-triangle-outline',
        label: 'Triangle Outline',
        value: 'triangle-outline'
      },
      {
        icon: 'arrow-thin-triangle',
        label: 'Thin Triangle',
        value: 'thin-triangle'
      },
      {
        icon: 'arrow-halved-triangle',
        label: 'Halved Triangle',
        value: 'halved-triangle'
      },
      {
        icon: 'arrow-diamond',
        label: 'Diamond',
        value: 'diamond'
      },
      {
        icon: 'arrow-diamond-outline',
        label: 'Diamond Outline',
        value: 'diamond-outline'
      },
      {
        icon: 'arrow-circle',
        label: 'Circle',
        value: 'circle'
      },
      {
        icon: 'arrow-circle-outline',
        label: 'Circle Outline',
        value: 'circle-outline'
      }
    ]
  },
  {
    datasetKey: 'pathfindingMethod',
    label: 'Pathfinding Method',
    options: [
      {
        icon: 'pathfinding-method-bezier',
        label: 'Bezier (default)',
        value: null
      },
      {
        icon: 'slash',
        label: 'Direct',
        value: 'direct'
      },
      {
        icon: 'pathfinding-method-square',
        label: 'Square',
        value: 'square'
      },
      {
        icon: 'map',
        label: 'A*',
        value: 'a-star'
      }
    ]
  }
] as StyleAttribute[]

export interface NamedColorAttribute{
	name : string,
	color : string
}

export const DEFAULT_NODE_NAMED_COLOR_ATTRIBUTES = [
	{
		name : "接口",
		color : "#FFFFFF"
	},
	{
		name : "结构体",
		color : "#F0FF80"
	},
	{
		name : "虚幻类",
		color : "#AE00FF"
	},
	{
		name : "普通类",
		color : "#EEFF00",
	},
	{
		name : "组件",
		color : "#0400FF"
	},
	{
		name : "枚举",
		color : "#00FF33"
	},
	{
		name : "委托",
		color : "#00B3FF"
	}
] as NamedColorAttribute[]

export const DEFAULT_LINE_NAMED_COLOR_ATTRIBUTES = [
	{
		name : "引用",
		color : "#E1FF00"
	},
	{
		name : "创建",
		color : "#BB00FF"
	},
	{
		name : "继承",
		color : "#FF0000"
	},
	{
		name : "聚合",
		color : "#0062FF"
	}
] as NamedColorAttribute[]
