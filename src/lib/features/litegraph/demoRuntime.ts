type Vec2 = [number, number];

export type DemoExampleId = 'climate' | 'nightHumidity' | 'mqttBridge' | 'safetyAlert';

type LiteGraphNode = {
	connect: (slot: number, target: LiteGraphNode, targetSlot: number) => void;
	demoType?: string;
	pos: Vec2;
	properties?: Record<string, unknown>;
	size?: Vec2;
	title?: string;
};

type LiteGraphGroup = {
	color?: string;
	font_size?: number;
	note?: string;
	note_font_size?: number;
	pos: Vec2;
	size: Vec2;
	title: string;
};

type LiteGraphNodeBase = {
	addInput: (name: string, type: string, extra?: Record<string, unknown>) => void;
	addOutput: (name: string, type: string, extra?: Record<string, unknown>) => void;
	color?: string;
	getInputData: (slot: number) => unknown;
	onDrawForeground?: (ctx: CanvasRenderingContext2D) => void;
	onExecute?: () => void;
	properties?: Record<string, unknown>;
	setOutputData: (slot: number, data: unknown) => void;
	size?: Vec2;
	title?: string;
};

type LiteGraphNamespace = {
	LGraphGroup?: new (title?: string) => LiteGraphGroup;
	LGraphNode: new () => LiteGraphNodeBase;
	SPLINE_LINK?: number;
	createNode: (type: string) => LiteGraphNode | null;
	registerNodeType: (type: string, nodeClass: unknown) => void;
	wheel_listeners_are_passive?: boolean;
};

type LiteGraphGraph = {
	change?: () => void;
	add: (node: LiteGraphNode | LiteGraphGroup) => void;
	start: () => void;
	stop: () => void;
};

type LiteGraphCanvas = {
	adjustMouseEvent?: (event: LiteGraphWheelEvent) => void;
	allow_dragcanvas?: boolean;
	connections_width?: number;
	ds?: {
		changeScale?: (value: number, zoomingCenter?: [number, number]) => void;
		max_scale?: number;
		min_scale?: number;
		offset: Vec2;
		scale: number;
	};
	graph?: LiteGraphGraph;
	links_render_mode?: number;
	render_connection_arrows?: boolean;
	render_curved_connections?: boolean;
	render_shadows?: boolean;
	resize: () => void;
	round_radius?: number;
	setDirty: (foreground: boolean, background: boolean) => void;
	show_info?: boolean;
	use_gradients?: boolean;
	viewport?: [number, number, number, number];
};

type LiteGraphCanvasConstructor = {
	new (canvas: HTMLCanvasElement, graph: LiteGraphGraph): LiteGraphCanvas;
	link_type_colors?: Record<string, string>;
	prototype?: LiteGraphCanvas & {
		processMouseWheel?: (event: LiteGraphWheelEvent) => false | void;
	};
};

type LiteGraphWindow = Window & {
	__growclipMarketingWheelPatched?: boolean;
	__growclipMarketingNodesRegistered?: boolean;
	LGraph?: new () => LiteGraphGraph;
	LGraphGroup?: new (title?: string) => LiteGraphGroup;
	LGraphCanvas?: LiteGraphCanvasConstructor;
	LiteGraph?: LiteGraphNamespace;
	NodeflowStyle?: typeof NODEFLOW_STYLE;
};

type DemoNodeSpec = {
	pos: Vec2;
	properties?: Record<string, unknown>;
	title?: string;
	type: string;
};

type DemoConnectionSpec = {
	from: string;
	fromSlot: number;
	to: string;
	toSlot: number;
};

type DemoExample = {
	connections: DemoConnectionSpec[];
	nodes: Record<string, DemoNodeSpec>;
};

type DemoGroupSpec = {
	color: string;
	note: string;
	pos: Vec2;
	size: Vec2;
	title: string;
};

type LiteGraphWheelEvent = WheelEvent & {
	detail?: number;
	wheelDeltaY?: number;
};

const DEFAULT_EXAMPLE: DemoExampleId = 'climate';

const NODEFLOW_COLORS = {
	ERROR: '#e74c3c',
	NEUTRAL: '#95a5a6',
	SUCCESS: '#2ecc71',
	TEXT: '#e8eaed',
	WARNING: '#f39c12'
} as const;

const NODEFLOW_FONTS = {
	MAIN: '12px monospace',
	STATUS: '11px monospace'
} as const;

const SLOT_COLORS = {
	CONDITION: { off: '#15803d', on: '#22c55e' },
	TIME: { off: '#b45309', on: '#fbbf24' },
	VALUE: { off: '#0891b2', on: '#22d3ee' }
} as const;

const SLOT_TYPES = {
	BOOLEAN: 'boolean',
	NUMBER: 'number',
	TIME: 'time'
} as const;

const SLOT_LABELS = {
	COMPARE_TO: 'compare to',
	CONDITION: 'condition',
	TIME_IN: 'time in',
	TIME_OK: 'time ok',
	VALUE: 'value'
} as const;

function slotColorMeta(
	colors: { off: string; on: string },
	extra: Record<string, unknown> = {}
): Record<string, unknown> {
	return {
		color_off: colors.off,
		color_on: colors.on,
		...extra
	};
}

function valueSlot(extra: Record<string, unknown> = {}) {
	return slotColorMeta(SLOT_COLORS.VALUE, extra);
}

function timeSlot(extra: Record<string, unknown> = {}) {
	return slotColorMeta(SLOT_COLORS.TIME, { label: 'time', ...extra });
}

function conditionSlot(extra: Record<string, unknown> = {}) {
	return slotColorMeta(SLOT_COLORS.CONDITION, extra);
}

const BUTTON_STYLES = {
	danger: {
		background: '#87404a',
		hover: '#99505a',
		pressed: '#723640',
		stroke: 'rgba(255,214,220,0.14)',
		text: '#fff5f6'
	},
	neutral: {
		background: '#3a4550',
		hover: '#465361',
		pressed: '#303943',
		stroke: 'rgba(255,255,255,0.1)',
		text: '#f3f6f9'
	},
	success: {
		background: '#377a4f',
		hover: '#42905d',
		pressed: '#2d6642',
		stroke: 'rgba(199,255,216,0.16)',
		text: '#f4fff7'
	},
	warning: {
		background: '#7a6234',
		hover: '#8b7140',
		pressed: '#66522b',
		stroke: 'rgba(255,237,191,0.15)',
		text: '#fff8e7'
	}
} as const;

const METRIC_CARD_DEFAULT_SIZE: Vec2 = [280, 140];
const ACTION_CARD_DEFAULT_SIZE: Vec2 = [280, 156];
const MQTT_PUBLISH_SIZE: Vec2 = [280, 172];
const KNOB_SIZE: Vec2 = [140, 140];
const ACTION_CARD_INPUT_GUTTER = 104;
const ACTION_CARD_BUTTON_HEIGHT = 24;
const ACTION_CARD_BUTTON_WIDTH = 55;
const ACTION_CARD_BUTTON_GAP = 10;
const ACTION_CARD_BUTTON_BOTTOM = 16;
const LITEGRAPH_TITLE_HEIGHT = 30;
const DEMO_GROUP_HEADER_SPACE = 48;

const NODEFLOW_STYLE = {
	COLORS: NODEFLOW_COLORS,
	FONTS: NODEFLOW_FONTS,
	getDefaultSizeForType(type: string): Vec2 {
		if (type === 'Input/Number') {
			return [...KNOB_SIZE] as Vec2;
		}
		if (type === 'Sensor/Time Source (DS3231)') {
			return [220, 110];
		}
		if (type === 'Devices/MQTT Publish') {
			return [...MQTT_PUBLISH_SIZE] as Vec2;
		}
		if (type.startsWith('Devices/')) {
			return [...ACTION_CARD_DEFAULT_SIZE] as Vec2;
		}
		return [...METRIC_CARD_DEFAULT_SIZE] as Vec2;
	},
	clipTextToWidth,
	drawCenteredTextBlock,
	drawNodeBodyText
} as const;

const DEMO_EXAMPLES: Record<DemoExampleId, DemoExample> = {
	climate: {
		nodes: {
			scd41: {
				type: 'Sensor/SCD41',
				pos: [24, 42],
				properties: { co2: 740, humidity: 61.5, temperature: 25.6 }
			},
			onThreshold: {
				type: 'Input/Number',
				pos: [24, 276],
				title: 'ON threshold',
				properties: { max: 40, min: 10, precision: 1, value: 27.2 }
			},
			offThreshold: {
				type: 'Input/Number',
				pos: [214, 276],
				title: 'OFF threshold',
				properties: { max: 40, min: 10, precision: 1, value: 24.5 }
			},
			timeSource: {
				type: 'Sensor/Time Source (DS3231)',
				pos: [184, 452],
				properties: { source: 'DS3231/NTP', time: '14:32:08' }
			},
			hysteresis: {
				type: 'Processing/Hysteresis',
				pos: [438, 124],
				properties: { off: 24.5, on: 27.2, state: false, value: 25.6 }
			},
			time: {
				type: 'Processing/Time Filter',
				pos: [438, 340],
				properties: { from: '08:00', result: true, to: '22:00' }
			},
			fan: {
				type: 'Devices/Shelly Plug',
				pos: [800, 78],
				title: 'Shelly Fan',
				properties: {
					client_id: 'shelly-fan',
					label: 'Shelly Fan',
					power: 18.4,
					status: 'ON',
					voltage: 230
				}
			},
			alert: {
				type: 'Devices/Telegram Notification',
				pos: [800, 326],
				title: 'Telegram Alert',
				properties: {
					edge: 'both',
					label: 'Telegram Alert',
					message: 'Temp/CO2 limit exceeded'
				}
			}
		},
		connections: [
			{ from: 'scd41', fromSlot: 0, to: 'hysteresis', toSlot: 0 },
			{ from: 'onThreshold', fromSlot: 0, to: 'hysteresis', toSlot: 1 },
			{ from: 'offThreshold', fromSlot: 0, to: 'hysteresis', toSlot: 2 },
			{ from: 'timeSource', fromSlot: 0, to: 'time', toSlot: 0 },
			{ from: 'hysteresis', fromSlot: 0, to: 'fan', toSlot: 1 },
			{ from: 'time', fromSlot: 0, to: 'fan', toSlot: 0 },
			{ from: 'hysteresis', fromSlot: 0, to: 'alert', toSlot: 1 },
			{ from: 'time', fromSlot: 0, to: 'alert', toSlot: 0 }
		]
	},
	nightHumidity: {
		nodes: {
			ble: {
				type: 'Sensor/BLE Thermometer',
				pos: [24, 54],
				title: 'Canopy BLE',
				properties: {
					battery: 88,
					humidity: 54.2,
					online: true,
					rssi: -61,
					temperature: 23.4
				}
			},
			threshold: {
				type: 'Input/Number',
				pos: [24, 286],
				title: 'humidity limit',
				properties: { max: 90, min: 30, precision: 0, value: 58 }
			},
			timeSource: {
				type: 'Sensor/Time Source (DS3231)',
				pos: [184, 466],
				properties: { source: 'DS3231/NTP', time: '23:41:12' }
			},
			compare: {
				type: 'Processing/Compare',
				pos: [438, 82],
				properties: { operator: '<', threshold: 58, valueLabel: 'humidity' }
			},
			time: {
				type: 'Processing/Time Filter',
				pos: [438, 320],
				properties: { from: '22:00', result: true, to: '06:00' }
			},
			socket: {
				type: 'Devices/433MHz Socket',
				pos: [800, 78],
				title: 'RF433 Mister',
				properties: { codeOff: '8129', codeOn: '8132', label: 'RF433 Mister' }
			},
			alert: {
				type: 'Devices/Telegram Notification',
				pos: [800, 326],
				title: 'Humidity Note',
				properties: { edge: 'both', label: 'Humidity Note', message: 'Night RH below target' }
			}
		},
		connections: [
			{ from: 'ble', fromSlot: 1, to: 'compare', toSlot: 0 },
			{ from: 'threshold', fromSlot: 0, to: 'compare', toSlot: 1 },
			{ from: 'timeSource', fromSlot: 0, to: 'time', toSlot: 0 },
			{ from: 'compare', fromSlot: 0, to: 'socket', toSlot: 1 },
			{ from: 'time', fromSlot: 0, to: 'socket', toSlot: 0 },
			{ from: 'compare', fromSlot: 0, to: 'alert', toSlot: 1 },
			{ from: 'time', fromSlot: 0, to: 'alert', toSlot: 0 }
		]
	},
	mqttBridge: {
		nodes: {
			mqttInput: {
				type: 'Sensor/MQTT Input',
				pos: [24, 72],
				properties: {
					path: '$.vwc',
					json_path: '$.vwc',
					label: 'MQTT Input',
					status: 'fresh',
					topic: 'growbox/soil',
					value: 31.6
				}
			},
			threshold: {
				type: 'Input/Number',
				pos: [24, 292],
				title: 'soil target',
				properties: { max: 80, min: 5, precision: 0, value: 32 }
			},
			timeSource: {
				type: 'Sensor/Time Source (DS3231)',
				pos: [184, 438],
				properties: { source: 'System/RTC', time: '09:05:44' }
			},
			compare: {
				type: 'Processing/Compare',
				pos: [438, 82],
				properties: { operator: '<', threshold: 32, valueLabel: 'soil VWC' }
			},
			time: {
				type: 'Processing/Time Filter',
				pos: [438, 312],
				properties: { from: '07:00', result: true, to: '21:00' }
			},
			pump: {
				type: 'Devices/Shelly Plug',
				pos: [800, 64],
				title: 'Shelly Pump',
				properties: {
					client_id: 'shelly-pump',
					label: 'Shelly Pump',
					power: 42.8,
					status: 'ON',
					voltage: 230
				}
			},
			publish: {
				type: 'Devices/MQTT Publish',
				pos: [800, 324],
				properties: {
					label: 'local state',
					body: '{"pump":true}',
					qos: 0,
					retain: false,
					topic: 'growbox/actions/pump'
				}
			}
		},
		connections: [
			{ from: 'mqttInput', fromSlot: 0, to: 'compare', toSlot: 0 },
			{ from: 'threshold', fromSlot: 0, to: 'compare', toSlot: 1 },
			{ from: 'timeSource', fromSlot: 0, to: 'time', toSlot: 0 },
			{ from: 'time', fromSlot: 0, to: 'pump', toSlot: 0 },
			{ from: 'time', fromSlot: 0, to: 'publish', toSlot: 0 },
			{ from: 'compare', fromSlot: 0, to: 'pump', toSlot: 1 },
			{ from: 'compare', fromSlot: 0, to: 'publish', toSlot: 1 }
		]
	},
	safetyAlert: {
		nodes: {
			scd41: {
				type: 'Sensor/SCD41',
				pos: [24, 48],
				properties: { co2: 1280, humidity: 63.1, temperature: 26.1 }
			},
			co2Limit: {
				type: 'Input/Number',
				pos: [24, 288],
				title: 'CO2 limit',
				properties: { max: 2500, min: 400, precision: 0, value: 1200 }
			},
			timeSource: {
				type: 'Sensor/Time Source (DS3231)',
				pos: [160, 512],
				properties: { source: 'DS3231/NTP', time: '18:18:22' }
			},
			co2Compare: {
				type: 'Processing/Compare',
				pos: [438, 70],
				properties: { operator: '>', threshold: 1200, valueLabel: 'co2 ppm' }
			},
			ble: {
				type: 'Sensor/BLE Thermometer',
				pos: [438, 292],
				title: 'Rack BLE',
				properties: {
					battery: 12,
					humidity: 62.5,
					online: false,
					rssi: -89,
					temperature: 25.9
				}
			},
			time: {
				type: 'Processing/Time Filter',
				pos: [438, 512],
				properties: { from: '00:00', result: true, to: '23:59' }
			},
			offlineAlert: {
				type: 'Devices/Telegram Notification',
				pos: [920, 68],
				title: 'CO2 Alert',
				properties: {
					edge: 'both',
					label: 'CO2 Alert',
					message: 'CO2 above configured limit'
				}
			},
			batteryAlert: {
				type: 'Devices/Telegram Notification',
				pos: [920, 340],
				title: 'Sensor Alert',
				properties: {
					edge: 'both',
					label: 'Sensor Alert',
					message: 'BLE thermometer stale/offline'
				}
			}
		},
		connections: [
			{ from: 'scd41', fromSlot: 2, to: 'co2Compare', toSlot: 0 },
			{ from: 'co2Limit', fromSlot: 0, to: 'co2Compare', toSlot: 1 },
			{ from: 'timeSource', fromSlot: 0, to: 'time', toSlot: 0 },
			{ from: 'time', fromSlot: 0, to: 'offlineAlert', toSlot: 0 },
			{ from: 'time', fromSlot: 0, to: 'batteryAlert', toSlot: 0 },
			{ from: 'co2Compare', fromSlot: 0, to: 'offlineAlert', toSlot: 1 },
			{ from: 'ble', fromSlot: 4, to: 'batteryAlert', toSlot: 1 }
		]
	}
};

function toFiniteNumber(value: unknown, fallback: number): number {
	const number = Number(value);
	return Number.isFinite(number) ? number : fallback;
}

function readNumber(
	properties: Record<string, unknown> | undefined,
	key: string,
	fallback: number
): number {
	return toFiniteNumber(properties?.[key], fallback);
}

function readString(
	properties: Record<string, unknown> | undefined,
	key: string,
	fallback: string
): string {
	const value = properties?.[key];
	return typeof value === 'string' && value.trim() ? value : fallback;
}

function readBoolean(
	properties: Record<string, unknown> | undefined,
	key: string,
	fallback: boolean
): boolean {
	const value = properties?.[key];
	return typeof value === 'boolean' ? value : fallback;
}

type HysteresisEvaluation = {
	direction: 'falling' | 'rising' | null;
	state: boolean;
	valid: boolean;
};

function evaluateHysteresis(
	value: number,
	onThreshold: number,
	offThreshold: number,
	previousState: boolean
): HysteresisEvaluation {
	if (
		!Number.isFinite(value) ||
		!Number.isFinite(onThreshold) ||
		!Number.isFinite(offThreshold) ||
		onThreshold === offThreshold
	) {
		return { direction: null, state: false, valid: false };
	}

	if (onThreshold > offThreshold) {
		return {
			direction: 'rising',
			state: previousState ? value > offThreshold : value >= onThreshold,
			valid: true
		};
	}

	return {
		direction: 'falling',
		state: previousState ? value < offThreshold : value <= onThreshold,
		valid: true
	};
}

function readInputNumber(node: LiteGraphNodeBase, slot: number, fallback: number): number {
	const value = node.getInputData(slot);
	return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clipTextToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
	if (!text || ctx.measureText(text).width <= maxWidth) {
		return text;
	}
	let clipped = text;
	while (clipped.length > 1 && ctx.measureText(`${clipped}...`).width > maxWidth) {
		clipped = clipped.slice(0, -1);
	}
	return `${clipped}...`;
}

function resolveNodeBodyRect(
	node: LiteGraphNodeBase,
	options: {
		bottomPadding?: number;
		leftPadding?: number;
		outputGutter?: number;
		rightPadding?: number;
		topPadding?: number;
	} = {}
) {
	const size = node.size ?? METRIC_CARD_DEFAULT_SIZE;
	const left = options.leftPadding ?? 18;
	const right = options.rightPadding ?? 12;
	const top = options.topPadding ?? 42;
	const bottom = options.bottomPadding ?? 18;
	const outputGutter = options.outputGutter ?? 96;
	return {
		h: Math.max(0, size[1] - top - bottom),
		w: Math.max(0, size[0] - left - right - outputGutter),
		x: left,
		y: top
	};
}

function drawNodeBodyText(
	ctx: CanvasRenderingContext2D,
	node: LiteGraphNodeBase,
	lines: readonly string[],
	options: {
		align?: CanvasTextAlign;
		bottomPadding?: number;
		color?: string;
		font?: string;
		leftPadding?: number;
		lineHeight?: number;
		maxLines?: number;
		outputGutter?: number;
		rightPadding?: number;
		topPadding?: number;
		verticalAlign?: 'top' | 'center';
	} = {}
) {
	const rect = resolveNodeBodyRect(node, options);
	if (rect.w <= 0 || rect.h <= 0) {
		return;
	}
	const lineHeight = options.lineHeight ?? 18;
	const visible = lines
		.map((line) => String(line ?? '').trim())
		.filter(Boolean)
		.slice(
			0,
			Math.min(options.maxLines ?? lines.length, Math.max(1, Math.floor(rect.h / lineHeight)))
		);
	const align = options.align ?? 'left';
	const x = align === 'center' ? rect.x + rect.w / 2 : align === 'right' ? rect.x + rect.w : rect.x;
	const totalHeight = visible.length * lineHeight;
	const yStart =
		options.verticalAlign === 'center'
			? rect.y + Math.max(0, (rect.h - totalHeight) / 2) + lineHeight / 2
			: rect.y + lineHeight / 2;

	ctx.save();
	ctx.font = options.font ?? NODEFLOW_FONTS.MAIN;
	ctx.fillStyle = options.color ?? NODEFLOW_COLORS.TEXT;
	ctx.textAlign = align;
	ctx.textBaseline = 'middle';
	visible.forEach((line, index) => {
		ctx.fillText(clipTextToWidth(ctx, line, rect.w), x, yStart + index * lineHeight);
	});
	ctx.restore();
}

function drawCenteredTextBlock(
	ctx: CanvasRenderingContext2D,
	node: LiteGraphNodeBase,
	lines: readonly string[],
	options: {
		color?: string;
		font?: string;
		leftPadding?: number;
		lineHeight?: number;
		rightPadding?: number;
	} = {}
) {
	drawNodeBodyText(ctx, node, lines, {
		align: 'center',
		color: options.color,
		font: options.font ?? NODEFLOW_FONTS.MAIN,
		leftPadding: options.leftPadding ?? 24,
		lineHeight: options.lineHeight ?? 18,
		outputGutter: 24,
		rightPadding: options.rightPadding ?? 24,
		topPadding: 42,
		verticalAlign: 'center'
	});
}

function drawActionCardLines(
	ctx: CanvasRenderingContext2D,
	node: LiteGraphNodeBase,
	lines: readonly string[],
	options: {
		bottomPadding?: number;
		lineHeight?: number;
		maxLines?: number;
		topPadding?: number;
	} = {}
) {
	drawNodeBodyText(ctx, node, lines, {
		color: NODEFLOW_COLORS.TEXT,
		font: NODEFLOW_FONTS.MAIN,
		leftPadding: ACTION_CARD_INPUT_GUTTER,
		lineHeight: options.lineHeight ?? 16,
		maxLines: options.maxLines ?? lines.length,
		outputGutter: 0,
		rightPadding: 16,
		bottomPadding: options.bottomPadding ?? 18,
		topPadding: options.topPadding ?? 38
	});
}

function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number
) {
	ctx.beginPath();
	if (typeof ctx.roundRect === 'function') {
		ctx.roundRect(x, y, width, height, radius);
		return;
	}
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
}

function drawHysteresisBand(
	ctx: CanvasRenderingContext2D,
	node: LiteGraphNodeBase,
	value: number,
	onThreshold: number,
	offThreshold: number,
	evaluation: HysteresisEvaluation
) {
	const size = node.size ?? METRIC_CARD_DEFAULT_SIZE;
	const x = Math.max(108, Math.round(size[0] * 0.39));
	const width = Math.max(80, size[0] - x - 16);
	const y = 61;
	const height = 12;
	const stateLabel = evaluation.state ? 'ON' : 'OFF';
	const stateColor = evaluation.state ? NODEFLOW_COLORS.SUCCESS : NODEFLOW_COLORS.ERROR;

	ctx.save();
	ctx.font = NODEFLOW_FONTS.STATUS;
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'right';
	ctx.fillStyle = evaluation.valid ? stateColor : NODEFLOW_COLORS.ERROR;
	ctx.fillText(
		evaluation.valid ? `${formatFixed(value)} · ${stateLabel}` : 'INVALID · OFF',
		x + width,
		48
	);

	if (!evaluation.valid || evaluation.direction === null) {
		drawRoundedRect(ctx, x, y, width, height, 5);
		ctx.fillStyle = NODEFLOW_COLORS.ERROR;
		ctx.globalAlpha = 0.65;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.fillStyle = NODEFLOW_COLORS.TEXT;
		ctx.textAlign = 'center';
		ctx.fillText('ON and OFF must differ', x + width / 2, 92);
		ctx.fillText('output fails closed', x + width / 2, 112);
		ctx.restore();
		return;
	}

	const thresholdSpan = Math.abs(onThreshold - offThreshold);
	const domainMin = Math.min(onThreshold, offThreshold) - thresholdSpan * 0.55;
	const domainMax = Math.max(onThreshold, offThreshold) + thresholdSpan * 0.55;
	const toX = (input: number) => x + ((input - domainMin) / (domainMax - domainMin)) * width;
	const lowX = toX(Math.min(onThreshold, offThreshold));
	const highX = toX(Math.max(onThreshold, offThreshold));
	const lowColor =
		evaluation.direction === 'rising' ? NODEFLOW_COLORS.ERROR : NODEFLOW_COLORS.SUCCESS;
	const highColor =
		evaluation.direction === 'rising' ? NODEFLOW_COLORS.SUCCESS : NODEFLOW_COLORS.ERROR;

	drawRoundedRect(ctx, x, y, width, height, 5);
	ctx.clip();
	ctx.fillStyle = lowColor;
	ctx.globalAlpha = 0.88;
	ctx.fillRect(x, y, lowX - x, height);
	ctx.fillStyle = stateColor;
	ctx.globalAlpha = 0.28;
	ctx.fillRect(lowX, y, highX - lowX, height);
	ctx.fillStyle = highColor;
	ctx.globalAlpha = 0.88;
	ctx.fillRect(highX, y, x + width - highX, height);
	ctx.restore();

	ctx.save();
	drawRoundedRect(ctx, x, y, width, height, 5);
	ctx.strokeStyle = 'rgba(255,255,255,0.28)';
	ctx.lineWidth = 1;
	ctx.stroke();
	const markerX = Math.max(x, Math.min(x + width, toX(value)));
	ctx.beginPath();
	ctx.moveTo(markerX, y - 3);
	ctx.lineTo(markerX, y + height + 3);
	ctx.strokeStyle = NODEFLOW_COLORS.TEXT;
	ctx.lineWidth = 2;
	ctx.stroke();

	const lowLabel =
		evaluation.direction === 'rising'
			? `OFF ≤ ${formatFixed(offThreshold)}`
			: `ON ≤ ${formatFixed(onThreshold)}`;
	const highLabel =
		evaluation.direction === 'rising'
			? `ON ≥ ${formatFixed(onThreshold)}`
			: `OFF ≥ ${formatFixed(offThreshold)}`;
	ctx.font = NODEFLOW_FONTS.STATUS;
	ctx.fillStyle = NODEFLOW_COLORS.TEXT;
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';
	ctx.fillText(lowLabel, x, 88);
	ctx.textAlign = 'right';
	ctx.fillText(highLabel, x + width, 88);
	ctx.textAlign = 'center';
	ctx.fillStyle = stateColor;
	ctx.fillText(`middle band keeps ${stateLabel}`, x + width / 2, 107);
	ctx.fillStyle = NODEFLOW_COLORS.NEUTRAL;
	ctx.fillText(`${evaluation.direction} value activates ON`, x + width / 2, 125);
	ctx.restore();
}

function drawButton(
	ctx: CanvasRenderingContext2D,
	rect: { h: number; w: number; x: number; y: number },
	label: string,
	tone: keyof typeof BUTTON_STYLES
) {
	const style = BUTTON_STYLES[tone];
	ctx.save();
	drawRoundedRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(8, rect.h / 2));
	ctx.fillStyle = style.background;
	ctx.fill();
	ctx.strokeStyle = style.stroke;
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fillStyle = style.text;
	ctx.font = '600 11px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 0.5);
	ctx.restore();
}

function getActionButtonRowBounds(
	node: LiteGraphNodeBase,
	keys: readonly string[],
	options: { buttonWidth?: number } = {}
) {
	const size = node.size ?? ACTION_CARD_DEFAULT_SIZE;
	const buttonWidth = options.buttonWidth ?? ACTION_CARD_BUTTON_WIDTH;
	const totalWidth =
		keys.length * buttonWidth + Math.max(0, keys.length - 1) * ACTION_CARD_BUTTON_GAP;
	const contentWidth = Math.max(80, size[0] - ACTION_CARD_INPUT_GUTTER - 16);
	const contentCenter = ACTION_CARD_INPUT_GUTTER + contentWidth / 2;
	const startX = Math.max(2, Math.min(size[0] - totalWidth - 2, contentCenter - totalWidth / 2));
	const y = Math.max(0, size[1] - ACTION_CARD_BUTTON_BOTTOM - ACTION_CARD_BUTTON_HEIGHT);
	return keys.map((key, index) => ({
		h: ACTION_CARD_BUTTON_HEIGHT,
		key,
		w: buttonWidth,
		x: startX + index * (buttonWidth + ACTION_CARD_BUTTON_GAP),
		y
	}));
}

function drawActionButtons(ctx: CanvasRenderingContext2D, node: LiteGraphNodeBase) {
	const buttons = getActionButtonRowBounds(node, ['auto', 'on', 'off']);
	drawButton(ctx, buttons[0], 'AUTO', 'neutral');
	drawButton(ctx, buttons[1], 'ON', 'success');
	drawButton(ctx, buttons[2], 'OFF', 'danger');
}

function drawMqttPublishButtons(ctx: CanvasRenderingContext2D, node: LiteGraphNodeBase) {
	const buttons = getActionButtonRowBounds(node, ['auto', 'publish'], { buttonWidth: 72 });
	drawButton(ctx, buttons[0], 'AUTO', 'neutral');
	drawButton(ctx, buttons[1], 'SEND', 'neutral');
}

function formatFixed(value: number, precision = 1): string {
	return value.toFixed(precision);
}

function formatMetric(value: number | null, suffix: string, digits = 1): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '-';
	}
	const formatted = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(digits);
	return suffix ? `${formatted} ${suffix}` : formatted;
}

function formatActionMetric(value: number, digits: number, suffix: string): string {
	return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(digits)} ${suffix}`;
}

function preview(value: unknown, limit = 42): string {
	const text = String(value ?? '')
		.replace(/\s+/g, ' ')
		.trim();
	if (!text) {
		return '(empty)';
	}
	return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function compactCode(value: unknown): string {
	const text = String(value || '');
	return text.length > 10 ? `${text.slice(0, 4)}...${text.slice(-3)}` : text;
}

function readBody(properties: Record<string, unknown> | undefined): string {
	return readString(properties, 'body', readString(properties, 'payload', '{"state":true}'));
}

function formatFreshValue(value: number): string {
	return value >= 0.5 ? 'yes' : 'no';
}

function statusText(online: boolean): string {
	return online ? 'Status online' : 'Status stale 2m';
}

function timeWindowFromProperties(properties: Record<string, unknown> | undefined): string {
	const from = readString(properties, 'from', '08:00');
	const to = readString(properties, 'to', '18:00');
	return `${from} - ${to}`;
}

function installNodeflowStyle(win: LiteGraphWindow) {
	win.NodeflowStyle = NODEFLOW_STYLE;
	if (win.LGraphCanvas) {
		win.LGraphCanvas.link_type_colors = {
			...(win.LGraphCanvas.link_type_colors ?? {}),
			boolean: SLOT_COLORS.CONDITION.on,
			number: SLOT_COLORS.VALUE.on,
			time: SLOT_COLORS.TIME.on
		};
	}
}

function installSoftWheelZoom(win: LiteGraphWindow, liteGraph: LiteGraphNamespace) {
	const prototype = win.LGraphCanvas?.prototype;
	if (!prototype || win.__growclipMarketingWheelPatched) {
		return;
	}

	prototype.processMouseWheel = function processMouseWheel(this: LiteGraphCanvas, event) {
		if (!this.graph || !this.allow_dragcanvas || !this.ds) {
			return;
		}

		const delta =
			typeof event.wheelDeltaY === 'number'
				? event.wheelDeltaY
				: typeof event.deltaY === 'number'
					? -event.deltaY
					: Number(event.detail || 0) * -60;
		this.adjustMouseEvent?.(event);

		const x = event.clientX;
		const y = event.clientY;
		const isInside =
			!this.viewport ||
			(x >= this.viewport[0] &&
				x < this.viewport[0] + this.viewport[2] &&
				y >= this.viewport[1] &&
				y < this.viewport[1] + this.viewport[3]);
		if (!isInside) {
			return false;
		}

		const zoomStep = 1.04;
		const nextScale =
			delta > 0 ? this.ds.scale * zoomStep : delta < 0 ? this.ds.scale / zoomStep : this.ds.scale;
		this.ds.changeScale?.(nextScale, [event.clientX, event.clientY]);
		this.graph.change?.();

		if (!liteGraph.wheel_listeners_are_passive && event.cancelable) {
			event.preventDefault();
		}
		return false;
	};

	win.__growclipMarketingWheelPatched = true;
}

function applyCanvasStyle(canvas: LiteGraphCanvas, liteGraph: LiteGraphNamespace) {
	canvas.render_curved_connections = true;
	canvas.links_render_mode = liteGraph.SPLINE_LINK ?? 2;
	canvas.connections_width = 4;
	canvas.round_radius = 12;
	canvas.use_gradients = true;
	canvas.render_shadows = true;
	canvas.render_connection_arrows = false;
	canvas.show_info = false;
	if (canvas.ds) {
		canvas.ds.min_scale = 0.3;
		canvas.ds.max_scale = 1.6;
	}
}

function getNodeSize(node: LiteGraphNode): Vec2 {
	const fallback = NODEFLOW_STYLE.getDefaultSizeForType(node.demoType ?? '');
	return [
		Math.max(toFiniteNumber(node.size?.[0], fallback[0]), fallback[0]),
		Math.max(toFiniteNumber(node.size?.[1], fallback[1]), fallback[1])
	];
}

function getGroupSize(group: LiteGraphGroup): Vec2 {
	return [
		Math.max(toFiniteNumber(group.size?.[0], 140), 140),
		Math.max(toFiniteNumber(group.size?.[1], 80), 80)
	];
}

function fitExampleToCanvas(
	target: HTMLCanvasElement,
	canvas: LiteGraphCanvas,
	nodes: readonly LiteGraphNode[],
	groups: readonly LiteGraphGroup[] = []
) {
	if (!canvas.ds || nodes.length === 0) {
		return;
	}
	const minX = Math.min(
		...nodes.map((node) => node.pos[0]),
		...groups.map((group) => group.pos[0])
	);
	const minY = Math.min(
		...nodes.map((node) => node.pos[1] - LITEGRAPH_TITLE_HEIGHT),
		...groups.map((group) => group.pos[1])
	);
	const maxX = Math.max(
		...nodes.map((node) => node.pos[0] + getNodeSize(node)[0]),
		...groups.map((group) => group.pos[0] + getGroupSize(group)[0])
	);
	const maxY = Math.max(
		...nodes.map((node) => node.pos[1] + getNodeSize(node)[1]),
		...groups.map((group) => group.pos[1] + getGroupSize(group)[1])
	);
	const graphWidth = Math.max(1, maxX - minX);
	const graphHeight = Math.max(1, maxY - minY);
	const width = Math.max(320, target.clientWidth || target.width);
	const height = Math.max(320, target.clientHeight || target.height);
	const margin = width < 520 ? 16 : 28;
	const maxScale = width < 520 ? 0.58 : 0.84;
	const fitScale = Math.min((width - margin * 2) / graphWidth, (height - margin * 2) / graphHeight);
	const scale = Math.min(maxScale, Math.max(width < 520 ? 0.28 : 0.58, fitScale));
	const horizontalMargin = Math.max(margin / scale, (width / scale - graphWidth) / 2);
	canvas.ds.scale = scale;
	canvas.ds.offset = [horizontalMargin - minX, margin / scale - minY];
}

function registerMarketingNodes(liteGraph: LiteGraphNamespace, win: LiteGraphWindow) {
	if (win.__growclipMarketingNodesRegistered) {
		return;
	}

	installNodeflowStyle(win);
	const NodeBase = liteGraph.LGraphNode;

	class SCD41InputNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Air Quality';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Sensor/SCD41');
			this.properties = { co2: 720, humidity: 62, temperature: 25.4 };
			this.addOutput('temperature', SLOT_TYPES.NUMBER, valueSlot({ label: 'temp' }));
			this.addOutput('humidity', SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput('co2', SLOT_TYPES.NUMBER, valueSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			drawNodeBodyText(
				ctx,
				this,
				[
					`temp: ${formatMetric(readNumber(props, 'temperature', 25.4), 'C')}`,
					`humidity: ${formatMetric(readNumber(props, 'humidity', 62.0), '%')}`,
					`co2: ${formatMetric(readNumber(props, 'co2', 720), 'ppm', 0)}`
				],
				{
					bottomPadding: 18,
					leftPadding: 18,
					lineHeight: 18,
					maxLines: 3,
					outputGutter: 104,
					topPadding: 42
				}
			);
		};

		onExecute = () => {
			const props = this.properties;
			this.setOutputData(0, readNumber(props, 'temperature', 25.4));
			this.setOutputData(1, readNumber(props, 'humidity', 62.0));
			this.setOutputData(2, readNumber(props, 'co2', 720));
		};
	}

	class BleThermometerNode extends NodeBase {
		constructor() {
			super();
			this.title = 'BLE Thermometer';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Sensor/BLE Thermometer');
			this.properties = {
				battery: 88,
				humidity: 60.2,
				online: true,
				rssi: -64,
				temperature: 24.8
			};
			this.addOutput('temperature', SLOT_TYPES.NUMBER, valueSlot({ label: 'temp' }));
			this.addOutput('humidity', SLOT_TYPES.NUMBER, valueSlot({ label: 'hum' }));
			this.addOutput('battery', SLOT_TYPES.NUMBER, valueSlot({ label: 'bat' }));
			this.addOutput('rssi', SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput('online', SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			const online = readBoolean(props, 'online', true);
			drawNodeBodyText(
				ctx,
				this,
				[
					`Temp ${formatMetric(readNumber(props, 'temperature', 24.8), 'C')}  Hum ${formatMetric(readNumber(props, 'humidity', 60.2), '%')}`,
					`Bat ${formatMetric(readNumber(props, 'battery', 88), '%', 0)}  RSSI ${formatMetric(readNumber(props, 'rssi', -64), 'dBm', 0)}`,
					statusText(online)
				],
				{
					leftPadding: 18,
					lineHeight: 18,
					maxLines: 3,
					outputGutter: 92,
					topPadding: 44
				}
			);
		};
	}

	class MqttInputNode extends NodeBase {
		constructor() {
			super();
			this.title = 'MQTT Input';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Sensor/MQTT Input');
			this.properties = {
				age_sec: 3,
				fresh: 1,
				json_path: '$.value',
				label: 'MQTT Input',
				status: 'fresh',
				topic: 'growbox/input',
				value: 42
			};
			this.addOutput('value', SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput('fresh', SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput('age_sec', SLOT_TYPES.NUMBER, valueSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			this.title = readString(props, 'label', 'MQTT Input');
			drawNodeBodyText(
				ctx,
				this,
				[
					`Topic: ${preview(readString(props, 'topic', 'growbox/input'), 32)}`,
					`JSON value: ${preview(readString(props, 'json_path', '$.value'), 32)}`,
					`Value: ${formatMetric(readNumber(props, 'value', 42), '%')}`,
					`Fresh: ${formatFreshValue(readNumber(props, 'fresh', 1))} | age: ${formatMetric(readNumber(props, 'age_sec', 3), 's')}`,
					`Status: ${readString(props, 'status', 'ok')}`
				],
				{
					bottomPadding: 16,
					leftPadding: 18,
					lineHeight: 16,
					maxLines: 5,
					outputGutter: 64,
					topPadding: 38
				}
			);
		};
	}

	class NumberInputNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Number';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Input/Number');
			this.properties = { max: 100, min: 0, precision: 1, value: 50 };
			this.addOutput(SLOT_LABELS.VALUE, SLOT_TYPES.NUMBER, valueSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			const min = readNumber(props, 'min', 0);
			const max = readNumber(props, 'max', 100);
			const value = readNumber(props, 'value', 50);
			const precision = Math.max(0, Math.round(readNumber(props, 'precision', 1)));
			const ratio = Math.max(0, Math.min(1, (value - min) / Math.max(1, max - min)));
			const size = this.size ?? KNOB_SIZE;
			const cx = size[0] * 0.5;
			const cy = size[1] * 0.5 + 5;
			const radius = Math.min(size[0], size[1]) * 0.38;
			const innerRadius = radius * 0.72;
			const startAngle = Math.PI * 0.75;
			const totalSweep = Math.PI * 1.5;
			const valueAngle = startAngle + totalSweep * ratio;
			const arcColor =
				ratio > 0.72 ? NODEFLOW_COLORS.ERROR : ratio > 0.45 ? NODEFLOW_COLORS.WARNING : '#22d3ee';

			ctx.save();
			ctx.beginPath();
			ctx.arc(cx, cy, radius, startAngle, startAngle + totalSweep);
			ctx.arc(cx, cy, innerRadius, startAngle + totalSweep, startAngle, true);
			ctx.closePath();
			ctx.fillStyle = 'rgba(255,255,255,0.08)';
			ctx.fill();

			ctx.shadowColor = arcColor;
			ctx.shadowBlur = 10;
			ctx.beginPath();
			ctx.arc(cx, cy, radius, startAngle, valueAngle);
			ctx.arc(cx, cy, innerRadius, valueAngle, startAngle, true);
			ctx.closePath();
			ctx.fillStyle = arcColor;
			ctx.fill();

			ctx.shadowColor = 'transparent';
			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(cx, cy, innerRadius - 4, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(0,0,0,0.3)';
			ctx.fill();

			ctx.fillStyle = arcColor;
			ctx.font = `300 ${Math.floor(radius * 0.55)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(value.toFixed(precision), cx, cy);
			ctx.restore();
		};

		onExecute = () => {
			this.setOutputData(0, readNumber(this.properties, 'value', 50));
		};
	}

	class TimeSourceNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Time Source (DS3231)';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Sensor/Time Source (DS3231)');
			this.properties = { source: 'DS3231/NTP', time: '12:00:00' };
			this.addOutput('time', SLOT_TYPES.TIME, timeSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			drawNodeBodyText(
				ctx,
				this,
				[
					`Time: ${readString(props, 'time', '12:00:00')}`,
					`Source: ${readString(props, 'source', 'DS3231/NTP')}`
				],
				{
					lineHeight: 18,
					maxLines: 2,
					outputGutter: 72,
					topPadding: 42,
					verticalAlign: 'center'
				}
			);
		};
	}

	class TimeFilterNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Time Filter';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Processing/Time Filter');
			this.properties = { from: '08:00', result: true, to: '22:00' };
			this.addInput(SLOT_LABELS.TIME_IN, SLOT_TYPES.TIME, timeSlot());
			this.addOutput(SLOT_LABELS.TIME_OK, SLOT_TYPES.TIME, timeSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			ctx.save();
			ctx.font = NODEFLOW_FONTS.MAIN;
			ctx.fillStyle = NODEFLOW_COLORS.TEXT;
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText(
				timeWindowFromProperties(this.properties),
				(this.size?.[0] ?? 280) / 2,
				(this.size?.[1] ?? 140) / 2
			);
			ctx.restore();
		};
	}

	class CompareNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Compare';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Processing/Compare');
			this.properties = { operator: '>', threshold: 50, valueLabel: 'value' };
			this.addInput(SLOT_LABELS.VALUE, SLOT_TYPES.NUMBER, valueSlot());
			this.addInput(SLOT_LABELS.COMPARE_TO, SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			const operator = readString(props, 'operator', '>');
			const threshold = readNumber(props, 'threshold', 50);
			this.title = `A ${operator} ${threshold}`;
			drawCenteredTextBlock(ctx, this, [`operator: ${operator}`]);
		};
	}

	class HysteresisNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Hysteresis';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Processing/Hysteresis');
			this.properties = { off: 24.5, on: 27.2, state: false, value: 25.6 };
			this.addInput(SLOT_LABELS.VALUE, SLOT_TYPES.NUMBER, valueSlot());
			this.addInput('ON', SLOT_TYPES.NUMBER, valueSlot());
			this.addInput('OFF', SLOT_TYPES.NUMBER, valueSlot());
			this.addOutput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			const value = readNumber(props, 'value', 25.6);
			const onThreshold = readNumber(props, 'on', 27.2);
			const offThreshold = readNumber(props, 'off', 24.5);
			const evaluation = evaluateHysteresis(
				value,
				onThreshold,
				offThreshold,
				readBoolean(props, 'state', false)
			);
			drawHysteresisBand(ctx, this, value, onThreshold, offThreshold, evaluation);
		};

		onExecute = () => {
			const props = this.properties ?? (this.properties = {});
			const value = readInputNumber(this, 0, readNumber(props, 'value', 25.6));
			const onThreshold = readInputNumber(this, 1, readNumber(props, 'on', 27.2));
			const offThreshold = readInputNumber(this, 2, readNumber(props, 'off', 24.5));
			const evaluation = evaluateHysteresis(
				value,
				onThreshold,
				offThreshold,
				readBoolean(props, 'state', false)
			);
			props.value = value;
			props.on = onThreshold;
			props.off = offThreshold;
			if (evaluation.valid) {
				props.state = evaluation.state;
			}
			this.setOutputData(0, evaluation.valid ? evaluation.state : false);
		};
	}

	class ShellyPlugNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Shelly Plug';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Devices/Shelly Plug');
			this.properties = {
				client_id: 'shelly-fan',
				label: 'shelly',
				power: 18.4,
				status: 'ON',
				voltage: 230
			};
			this.addInput(SLOT_LABELS.TIME_OK, SLOT_TYPES.TIME, timeSlot());
			this.addInput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			this.title = readString(props, 'label', 'shelly');
			drawActionCardLines(
				ctx,
				this,
				[
					`State: ${readString(props, 'status', 'ON')}`,
					`P: ${formatActionMetric(readNumber(props, 'power', 18.4), 1, 'W')}  V: ${formatActionMetric(readNumber(props, 'voltage', 230), 0, 'V')}`,
					`CID: ${readString(props, 'client_id', 'shelly')}`,
					'Both'
				],
				{ bottomPadding: 46, lineHeight: 14, maxLines: 4, topPadding: 38 }
			);
			drawActionButtons(ctx, this);
		};
	}

	class RFSocketNode extends NodeBase {
		constructor() {
			super();
			this.title = '433MHz Socket';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Devices/433MHz Socket');
			this.properties = { codeOff: '8129', codeOn: '8132', label: 'socket', trigger: 'AUTO' };
			this.addInput(SLOT_LABELS.TIME_OK, SLOT_TYPES.TIME, timeSlot());
			this.addInput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			this.title = readString(props, 'label', 'socket');
			drawActionCardLines(
				ctx,
				this,
				[
					`Label: ${readString(props, 'label', 'socket')}`,
					`Codes: ${compactCode(readString(props, 'codeOn', '8132'))}/${compactCode(readString(props, 'codeOff', '8129'))}`,
					'Trigger: Both'
				],
				{ bottomPadding: 46, lineHeight: 16, maxLines: 4 }
			);
			drawActionButtons(ctx, this);
		};
	}

	class TelegramNotificationNode extends NodeBase {
		constructor() {
			super();
			this.title = 'Telegram Notification';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Devices/Telegram Notification');
			this.properties = { edge: 'both', label: 'telegram', message: 'GrowClip alert' };
			this.addInput(SLOT_LABELS.TIME_OK, SLOT_TYPES.TIME, timeSlot());
			this.addInput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			this.title = readString(props, 'label', 'telegram');
			const message = readString(props, 'message', 'GrowClip alert');
			drawActionCardLines(
				ctx,
				this,
				[
					`Label: ${readString(props, 'label', 'telegram')}`,
					`Message: ${message.length > 30 ? `${message.slice(0, 27)}...` : message}`,
					'Trigger: Both'
				],
				{ lineHeight: 16, maxLines: 5 }
			);
		};
	}

	class MqttPublishNode extends NodeBase {
		constructor() {
			super();
			this.title = 'MQTT Publish';
			this.size = NODEFLOW_STYLE.getDefaultSizeForType('Devices/MQTT Publish');
			this.properties = {
				label: 'publish',
				body: '{"state":true}',
				qos: 0,
				retain: false,
				topic: 'growbox/action'
			};
			this.addInput(SLOT_LABELS.TIME_OK, SLOT_TYPES.TIME, timeSlot());
			this.addInput(SLOT_LABELS.CONDITION, SLOT_TYPES.BOOLEAN, conditionSlot());
		}

		onDrawForeground = (ctx: CanvasRenderingContext2D) => {
			const props = this.properties;
			drawActionCardLines(
				ctx,
				this,
				[
					`topic: ${readString(props, 'topic', 'growbox/action')}`,
					`payload: ${readBody(props)}`,
					`qos: ${Math.round(readNumber(props, 'qos', 0))}  Retain: ${readBoolean(props, 'retain', false) ? 'yes' : 'no'}`,
					'Trigger: Both'
				],
				{ bottomPadding: 46, lineHeight: 16, maxLines: 4, topPadding: 36 }
			);
			drawMqttPublishButtons(ctx, this);
		};
	}

	liteGraph.registerNodeType('Sensor/SCD41', SCD41InputNode);
	liteGraph.registerNodeType('Sensor/BLE Thermometer', BleThermometerNode);
	liteGraph.registerNodeType('Sensor/MQTT Input', MqttInputNode);
	liteGraph.registerNodeType('Sensor/Time Source (DS3231)', TimeSourceNode);
	liteGraph.registerNodeType('Input/Number', NumberInputNode);
	liteGraph.registerNodeType('Processing/Time Filter', TimeFilterNode);
	liteGraph.registerNodeType('Processing/Compare', CompareNode);
	liteGraph.registerNodeType('Processing/Hysteresis', HysteresisNode);
	liteGraph.registerNodeType('Devices/Shelly Plug', ShellyPlugNode);
	liteGraph.registerNodeType('Devices/433MHz Socket', RFSocketNode);
	liteGraph.registerNodeType('Devices/Telegram Notification', TelegramNotificationNode);
	liteGraph.registerNodeType('Devices/MQTT Publish', MqttPublishNode);

	win.__growclipMarketingNodesRegistered = true;
}

export class LiteGraphDemoController {
	private activeExample: DemoExampleId;
	private canvas: LiteGraphCanvas | null = null;
	private graph: LiteGraphGraph | null = null;
	private groups: LiteGraphGroup[] = [];
	private nodes: LiteGraphNode[] = [];
	private readonly target: HTMLCanvasElement;

	constructor(target: HTMLCanvasElement, initialExample: DemoExampleId = DEFAULT_EXAMPLE) {
		this.target = target;
		this.activeExample = initialExample;
	}

	destroy() {
		this.graph?.stop();
		this.graph = null;
		this.canvas = null;
		this.groups = [];
		this.nodes = [];
	}

	resize() {
		if (!this.canvas) {
			return;
		}
		this.canvas.resize();
		fitExampleToCanvas(this.target, this.canvas, this.nodes, this.groups);
		this.canvas.setDirty(true, true);
	}

	reset(exampleId: DemoExampleId = this.activeExample) {
		this.activeExample = exampleId;
		const win = window as LiteGraphWindow;
		const liteGraph = win.LiteGraph;
		if (!liteGraph || !win.LGraph || !win.LGraphCanvas) {
			throw new Error('LiteGraph runtime is not available');
		}

		registerMarketingNodes(liteGraph, win);
		installNodeflowStyle(win);
		installSoftWheelZoom(win, liteGraph);

		this.destroy();
		this.graph = new win.LGraph();
		this.canvas = new win.LGraphCanvas(this.target, this.graph);
		applyCanvasStyle(this.canvas, liteGraph);

		const example = DEMO_EXAMPLES[exampleId];
		const createdNodes = new Map<string, LiteGraphNode>();
		Object.entries(example.nodes).forEach(([id, spec]) => {
			createdNodes.set(id, this.createNode(liteGraph, spec));
		});
		this.nodes = Array.from(createdNodes.values());
		this.groups = this.createIpoGroups(win, this.nodes);
		example.connections.forEach((connection) => {
			const source = createdNodes.get(connection.from);
			const target = createdNodes.get(connection.to);
			if (!source || !target) {
				return;
			}
			source.connect(connection.fromSlot, target, connection.toSlot);
		});

		this.canvas.resize();
		fitExampleToCanvas(this.target, this.canvas, this.nodes, this.groups);

		this.graph.start();
		this.resize();
	}

	setExample(exampleId: DemoExampleId) {
		this.reset(exampleId);
	}

	private createNode(liteGraph: LiteGraphNamespace, spec: DemoNodeSpec): LiteGraphNode {
		const node = liteGraph.createNode(spec.type);
		if (!node) {
			throw new Error(`LiteGraph node was not registered: ${spec.type}`);
		}
		node.pos = [spec.pos[0], spec.pos[1] + DEMO_GROUP_HEADER_SPACE];
		if (spec.title) {
			node.title = spec.title;
		}
		node.demoType = spec.type;
		node.size = NODEFLOW_STYLE.getDefaultSizeForType(spec.type);
		node.properties = {
			...(node.properties ?? {}),
			...(spec.properties ?? {})
		};
		this.graph?.add(node);
		return node;
	}

	private createIpoGroups(win: LiteGraphWindow, nodes: readonly LiteGraphNode[]): LiteGraphGroup[] {
		const GroupCtor = win.LiteGraph?.LGraphGroup ?? win.LGraphGroup;
		if (!GroupCtor || !this.graph || nodes.length === 0) {
			return [];
		}

		const minNodeY = Math.min(...nodes.map((node) => node.pos[1]));
		const maxNodeY = Math.max(...nodes.map((node) => node.pos[1] + getNodeSize(node)[1]));
		const maxNodeX = Math.max(...nodes.map((node) => node.pos[0] + getNodeSize(node)[0]));
		const groupY = Math.max(0, minNodeY - 82);
		const groupHeight = Math.max(430, maxNodeY - groupY + 42);
		const specs: DemoGroupSpec[] = [
			{
				title: 'Input',
				note: 'Sensors, constants\nand time source',
				pos: [8, groupY],
				size: [384, groupHeight],
				color: '#2563eb'
			},
			{
				title: 'Processing',
				note: 'Compare, hysteresis\nand time gates',
				pos: [410, groupY],
				size: [330, groupHeight],
				color: '#047857'
			},
			{
				title: 'Output',
				note: 'Actuator or\nnotification',
				pos: [770, groupY],
				size: [Math.max(330, maxNodeX - 770 + 34), groupHeight],
				color: '#b45309'
			}
		];

		return specs.map((spec) => {
			const group = new GroupCtor(spec.title);
			group.title = spec.title;
			group.pos = spec.pos;
			group.size = spec.size;
			group.color = spec.color;
			group.font_size = 22;
			group.note = spec.note;
			group.note_font_size = 12;
			this.graph?.add(group);
			return group;
		});
	}
}

export async function mountLiteGraphDemo(
	target: HTMLCanvasElement,
	initialExample: DemoExampleId = DEFAULT_EXAMPLE
): Promise<LiteGraphDemoController> {
	await import('$lib/features/litegraph/vendor/litegraph.js');
	const controller = new LiteGraphDemoController(target, initialExample);
	controller.reset(initialExample);
	return controller;
}
