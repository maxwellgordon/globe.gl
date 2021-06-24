import { Object3D, Scene, Camera, WebGLRenderer, WebGLRendererParameters } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ThreeGlobeGeneric, ConfigOptions as ThreeGlobeConfigOptions } from 'three-globe';

export interface ConfigOptions extends ThreeGlobeConfigOptions {
  rendererConfig?: WebGLRendererParameters;
}

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type ObjAccessor<Out, In extends object = object> = Accessor<In, Out>;

interface HexBin<T extends object = object> {
  points: T[];
  sumWeight: number;
  center: { lat: number; lng: number };
}

interface GeoCoords {
  lat: number;
  lng: number;
  altitude: number;
}

type PointerEventsFilterFn = (object: Object3D, data?: object) => boolean;

export interface GlobeGenericInstance<
  ChainableInstance,
  PointType extends object = object,
  ArcType extends object = object,
  PolygonType extends object = object
> extends ThreeGlobeGeneric<ChainableInstance> {
  (element: HTMLElement): ChainableInstance;
  resetProps(): ChainableInstance;
  _destructor(): void;

  // Container layout
  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;
  backgroundColor(): string;
  backgroundColor(color: string): ChainableInstance;
  backgroundImageUrl(): string | null;
  backgroundImageUrl(url: string | null): ChainableInstance;

  // Labels
  pointLabel(): ObjAccessor<string, PointType>;
  pointLabel(textAccessor: ObjAccessor<string, PointType>): ChainableInstance;
  arcLabel(): ObjAccessor<string, ArcType>;
  arcLabel(textAccessor: ObjAccessor<string, ArcType>): ChainableInstance;
  polygonLabel(): ObjAccessor<string, PolygonType>;
  polygonLabel(textAccessor: ObjAccessor<string, PolygonType>): ChainableInstance;
  pathLabel(): ObjAccessor<string>;
  pathLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  hexLabel(): Accessor<HexBin<PointType>, string>;
  hexLabel(textAccessor: Accessor<HexBin<PointType>, string>): ChainableInstance;
  tileLabel(): ObjAccessor<string>;
  tileLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  labelLabel(): ObjAccessor<string>;
  labelLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  customLayerLabel(): ObjAccessor<string>;
  customLayerLabel(textAccessor: ObjAccessor<string>): ChainableInstance;

  // Interaction events
  onGlobeClick(callback: (coords: { lat; lng }, event: MouseEvent) => void): ChainableInstance;
  onGlobeRightClick(callback: (coords: { lat; lng }, event: MouseEvent) => void): ChainableInstance;
  onPointClick(callback: (point: PointType, event: MouseEvent) => void): ChainableInstance;
  onPointRightClick(callback: (point: PointType, event: MouseEvent) => void): ChainableInstance;
  onPointHover(
    callback: (point: PointType | null, prevPoint: PointType | null) => void
  ): ChainableInstance;
  onArcClick(callback: (arc: ArcType, event: MouseEvent) => void): ChainableInstance;
  onArcRightClick(callback: (arc: ArcType, event: MouseEvent) => void): ChainableInstance;
  onArcHover(callback: (arc: ArcType | null, prevArc: ArcType | null) => void): ChainableInstance;
  onPolygonClick(callback: (polygon: PolygonType, event: MouseEvent) => void): ChainableInstance;
  onPolygonRightClick(
    callback: (polygon: PolygonType, event: MouseEvent) => void
  ): ChainableInstance;
  onPolygonHover(
    callback: (polygon: PolygonType | null, prevPolygon: PolygonType | null) => void
  ): ChainableInstance;
  onPathClick(callback: (path: object, event: MouseEvent) => void): ChainableInstance;
  onPathRightClick(callback: (path: object, event: MouseEvent) => void): ChainableInstance;
  onPathHover(callback: (path: object | null, prevPath: object | null) => void): ChainableInstance;
  onHexClick(callback: (hex: HexBin<PointType>, event: MouseEvent) => void): ChainableInstance;
  onHexRightClick(callback: (hex: HexBin<PointType>, event: MouseEvent) => void): ChainableInstance;
  onHexHover(
    callback: (hex: HexBin<PointType> | null, prevHex: HexBin<PointType> | null) => void
  ): ChainableInstance;
  onHexPolygonClick(callback: (polygon: object, event: MouseEvent) => void): ChainableInstance;
  onHexPolygonRightClick(callback: (polygon: object, event: MouseEvent) => void): ChainableInstance;
  onHexPolygonHover(
    callback: (polygon: object | null, prevPolygon: object | null) => void
  ): ChainableInstance;
  onTileClick(callback: (tile: object, event: MouseEvent) => void): ChainableInstance;
  onTileRightClick(callback: (tile: object, event: MouseEvent) => void): ChainableInstance;
  onTileHover(callback: (tile: object | null, prevTile: object | null) => void): ChainableInstance;
  onLabelClick(callback: (label: object, event: MouseEvent) => void): ChainableInstance;
  onLabelRightClick(callback: (label: object, event: MouseEvent) => void): ChainableInstance;
  onLabelHover(
    callback: (label: object | null, prevLabel: object | null) => void
  ): ChainableInstance;
  onCustomLayerClick(callback: (obj: object, event: MouseEvent) => void): ChainableInstance;
  onCustomLayerRightClick(callback: (obj: object, event: MouseEvent) => void): ChainableInstance;
  onCustomLayerHover(
    callback: (obj: object | null, prevObj: object | null) => void
  ): ChainableInstance;

  // Render control
  pointOfView(): GeoCoords;
  pointOfView(
    pov: { lat?: number; lng?: number; altitude?: number },
    transitionMs?: number
  ): ChainableInstance;
  pauseAnimation(): ChainableInstance;
  resumeAnimation(): ChainableInstance;
  enablePointerInteraction(): boolean;
  enablePointerInteraction(enable: boolean): ChainableInstance;
  pointerEventsFilter(): PointerEventsFilterFn;
  pointerEventsFilter(filterFn: PointerEventsFilterFn): ChainableInstance;
  lineHoverPrecision(): number;
  lineHoverPrecision(precision: number): ChainableInstance;
  onZoom(callback: (pov: GeoCoords) => void): ChainableInstance;
  scene(): Scene;
  camera(): Camera;
  renderer(): WebGLRenderer;
  postProcessingComposer(): EffectComposer;
  controls(): object;

  // Utility
  getScreenCoords(lat: number, lng: number, altitude?: number): { x: number; y: number };
  toGlobeCoords(x: number, y: number): { lat: number; lng: number } | null;
}

export type GlobeInstance = GlobeGenericInstance<GlobeInstance>;

declare function Globe(configOptions?: ConfigOptions): GlobeInstance;

export default Globe;
