/**
 * TypeScript типы для Google Maps API
 */

declare global {
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
        fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
        getBounds(): LatLngBounds | undefined;
        getCenter(): LatLng;
        getDiv(): Element;
        getHeading(): number;
        getMapTypeId(): MapTypeId | string;
        getProjection(): Projection | null;
        getStreetView(): StreetViewPanorama;
        getTilt(): number;
        getZoom(): number;
        panBy(x: number, y: number): void;
        panTo(latLng: LatLng | LatLngLiteral): void;
        panToBounds(latLngBounds: LatLngBounds | LatLngBoundsLiteral): void;
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setHeading(heading: number): void;
        setMapTypeId(mapTypeId: MapTypeId | string): void;
        setOptions(options: MapOptions): void;
        setStreetView(panorama: StreetViewPanorama): void;
        setTilt(tilt: number): void;
        setZoom(zoom: number): void;
      }

      interface MapOptions {
        backgroundColor?: string;
        center?: LatLng | LatLngLiteral;
        clickableIcons?: boolean;
        controlSize?: number;
        disableDefaultUI?: boolean;
        disableDoubleClickZoom?: boolean;
        draggable?: boolean;
        draggableCursor?: string;
        draggingCursor?: string;
        fullscreenControl?: boolean;
        fullscreenControlOptions?: FullscreenControlOptions;
        gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
        heading?: number;
        keyboardShortcuts?: boolean;
        mapTypeControl?: boolean;
        mapTypeControlOptions?: MapTypeControlOptions;
        mapTypeId?: MapTypeId | string;
        maxZoom?: number;
        minZoom?: number;
        noClear?: boolean;
        panControl?: boolean;
        panControlOptions?: PanControlOptions;
        restriction?: MapRestriction;
        rotateControl?: boolean;
        rotateControlOptions?: RotateControlOptions;
        scaleControl?: boolean;
        scaleControlOptions?: ScaleControlOptions;
        scrollwheel?: boolean;
        streetView?: StreetViewPanorama;
        streetViewControl?: boolean;
        streetViewControlOptions?: StreetViewControlOptions;
        styles?: MapTypeStyle[];
        tilt?: number;
        zoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: ZoomControlOptions;
      }

      interface LatLng {
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      class LatLng {
        constructor(lat: number, lng: number, noWrap?: boolean);
        equals(other: LatLng): boolean;
        lat(): number;
        lng(): number;
        toString(): string;
        toUrlValue(precision?: number): string;
      }

      class LatLngBounds {
        constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
        contains(latLng: LatLng | LatLngLiteral): boolean;
        equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
        extend(point: LatLng | LatLngLiteral): LatLngBounds;
        getCenter(): LatLng;
        getNorthEast(): LatLng;
        getSouthWest(): LatLng;
        intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
        isEmpty(): boolean;
        toJSON(): LatLngBoundsLiteral;
        toString(): string;
        toUrlValue(precision?: number): string;
        union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
      }

      interface LatLngBoundsLiteral {
        east: number;
        north: number;
        south: number;
        west: number;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        addListener(eventName: string, handler: Function): MapsEventListener;
        getAnimation(): Animation | null;
        getClickable(): boolean;
        getCursor(): string | null;
        getDraggable(): boolean;
        getIcon(): string | Icon | Symbol | null;
        getLabel(): MarkerLabel | string | null;
        getMap(): Map | StreetViewPanorama | null;
        getOpacity(): number | null;
        getPosition(): LatLng | null;
        getShape(): MarkerShape | null;
        getTitle(): string | null;
        getVisible(): boolean;
        getZIndex(): number | null;
        setAnimation(animation: Animation | null): void;
        setClickable(flag: boolean): void;
        setCursor(cursor: string | null): void;
        setDraggable(flag: boolean): void;
        setIcon(icon: string | Icon | Symbol | null): void;
        setLabel(label: string | MarkerLabel | null): void;
        setMap(map: Map | StreetViewPanorama | null): void;
        setOpacity(opacity: number | null): void;
        setOptions(options: MarkerOptions): void;
        setPosition(latlng: LatLng | LatLngLiteral | null): void;
        setShape(shape: MarkerShape | null): void;
        setTitle(title: string | null): void;
        setVisible(visible: boolean): void;
        setZIndex(zIndex: number | null): void;
      }

      interface MarkerOptions {
        anchorPoint?: Point;
        animation?: Animation;
        clickable?: boolean;
        cursor?: string;
        draggable?: boolean;
        icon?: string | Icon | Symbol;
        label?: string | MarkerLabel;
        map?: Map | StreetViewPanorama;
        opacity?: number;
        optimized?: boolean;
        position?: LatLng | LatLngLiteral;
        shape?: MarkerShape;
        title?: string;
        visible?: boolean;
        zIndex?: number;
      }

      interface MarkerLabel {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        text: string;
      }

      interface MarkerShape {
        coords: number[];
        type: string;
      }

      interface Icon {
        anchor?: Point;
        labelOrigin?: Point;
        origin?: Point;
        scaledSize?: Size;
        size?: Size;
        url: string;
      }

      interface Symbol {
        anchor?: Point;
        fillColor?: string;
        fillOpacity?: number;
        labelOrigin?: Point;
        path: SymbolPath | string;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }

      enum Animation {
        BOUNCE = 1,
        DROP = 2,
      }

      enum MapTypeId {
        HYBRID = 'hybrid',
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        TERRAIN = 'terrain',
      }

      enum SymbolPath {
        BACKWARD_CLOSED_ARROW = 3,
        BACKWARD_OPEN_ARROW = 4,
        CIRCLE = 0,
        FORWARD_CLOSED_ARROW = 1,
        FORWARD_OPEN_ARROW = 2,
      }

      class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
        equals(other: Point): boolean;
        toString(): string;
      }

      class Size {
        constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
        height: number;
        width: number;
        equals(other: Size): boolean;
        toString(): string;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        close(): void;
        getContent(): string | Element | null;
        getPosition(): LatLng | null;
        getZIndex(): number;
        open(map?: Map | StreetViewPanorama, anchor?: Marker): void;
        setContent(content: string | Element | null): void;
        setOptions(options: InfoWindowOptions): void;
        setPosition(position: LatLng | LatLngLiteral | null): void;
        setZIndex(zIndex: number): void;
      }

      interface InfoWindowOptions {
        content?: string | Element;
        disableAutoPan?: boolean;
        maxWidth?: number;
        pixelOffset?: Size;
        position?: LatLng | LatLngLiteral;
        zIndex?: number;
      }

      // Control interfaces
      interface FullscreenControlOptions {
        position?: ControlPosition;
      }

      interface MapTypeControlOptions {
        mapTypeIds?: (MapTypeId | string)[];
        position?: ControlPosition;
        style?: MapTypeControlStyle;
      }

      interface PanControlOptions {
        position?: ControlPosition;
      }

      interface RotateControlOptions {
        position?: ControlPosition;
      }

      interface ScaleControlOptions {
        style?: ScaleControlStyle;
      }

      interface StreetViewControlOptions {
        position?: ControlPosition;
      }

      interface ZoomControlOptions {
        position?: ControlPosition;
        style?: ZoomControlStyle;
      }

      enum ControlPosition {
        BOTTOM_CENTER = 11,
        BOTTOM_LEFT = 10,
        BOTTOM_RIGHT = 12,
        LEFT_BOTTOM = 6,
        LEFT_CENTER = 4,
        LEFT_TOP = 5,
        RIGHT_BOTTOM = 9,
        RIGHT_CENTER = 8,
        RIGHT_TOP = 7,
        TOP_CENTER = 2,
        TOP_LEFT = 1,
        TOP_RIGHT = 3,
      }

      enum MapTypeControlStyle {
        DEFAULT = 0,
        DROPDOWN_MENU = 2,
        HORIZONTAL_BAR = 1,
      }

      enum ScaleControlStyle {
        DEFAULT = 0,
      }

      enum ZoomControlStyle {
        DEFAULT = 0,
        LARGE = 1,
        SMALL = 2,
      }

      // Map styling
      interface MapTypeStyle {
        elementType?: string;
        featureType?: string;
        stylers: MapTypeStyler[];
      }

      interface MapTypeStyler {
        color?: string;
        gamma?: number;
        hue?: string;
        invert_lightness?: boolean;
        lightness?: number;
        saturation?: number;
        visibility?: string;
        weight?: number;
      }

      interface MapRestriction {
        latLngBounds: LatLngBounds | LatLngBoundsLiteral;
        strictBounds?: boolean;
      }

      // Street View
      class StreetViewPanorama {
        constructor(container: Element, opts?: StreetViewPanoramaOptions);
        // Add methods as needed
      }

      interface StreetViewPanoramaOptions {
        // Add options as needed
      }

      // Projection
      interface Projection {
        fromLatLngToPoint(latLng: LatLng, point?: Point): Point;
        fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng;
      }

      // Event system
      namespace event {
        function addListener(
          instance: object,
          eventName: string,
          handler: Function
        ): MapsEventListener;
        function addListenerOnce(
          instance: object,
          eventName: string,
          handler: Function
        ): MapsEventListener;
        function clearInstanceListeners(instance: object): void;
        function clearListeners(instance: object, eventName: string): void;
        function removeListener(listener: MapsEventListener): void;
        function trigger(instance: object, eventName: string, ...args: any[]): void;
      }

      interface MapsEventListener {
        remove(): void;
      }

      // Places API
      namespace places {
        class PlacesService {
          constructor(attrContainer: HTMLDivElement | Map);
          findPlaceFromQuery(
            request: FindPlaceFromQueryRequest,
            callback: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void
          ): void;
          nearbySearch(
            request: PlaceSearchRequest,
            callback: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void
          ): void;
          textSearch(
            request: TextSearchRequest,
            callback: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void
          ): void;
        }

        interface FindPlaceFromQueryRequest {
          query: string;
          fields: string[];
          locationBias?: LocationBias;
        }

        interface PlaceSearchRequest {
          bounds?: LatLngBounds | LatLngBoundsLiteral;
          location?: LatLng | LatLngLiteral;
          radius?: number;
          type?: string;
          keyword?: string;
          name?: string;
        }

        interface TextSearchRequest {
          bounds?: LatLngBounds | LatLngBoundsLiteral;
          location?: LatLng | LatLngLiteral;
          query: string;
          radius?: number;
          type?: string;
        }

        interface PlaceResult {
          geometry?: PlaceGeometry;
          name?: string;
          place_id?: string;
          types?: string[];
          vicinity?: string;
          formatted_address?: string;
          rating?: number;
        }

        interface PlaceGeometry {
          location: LatLng;
          viewport: LatLngBounds;
        }

        type LocationBias = LatLng | LatLngBounds | LatLngBoundsLiteral | string;

        enum PlacesServiceStatus {
          INVALID_REQUEST = 'INVALID_REQUEST',
          NOT_FOUND = 'NOT_FOUND',
          OK = 'OK',
          OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
          REQUEST_DENIED = 'REQUEST_DENIED',
          UNKNOWN_ERROR = 'UNKNOWN_ERROR',
          ZERO_RESULTS = 'ZERO_RESULTS',
        }
      }
    }
  }

  // Global Google Maps loader
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }
}

export {};
