import clsx from "clsx";
import leafletStyle from "leaflet/dist/leaflet.css?inline";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { addInlineStyle } from "src/addStyles";
import { useSystemContext } from "src/contexts/hooks";
import modalStyle from "./LocationModal.scss?inline";
import buttonStyle from "/src/components/shared/Buttons/buttons.scss?inline";

import LocationMarker from "src/assets/SvgIcons/LocationMarker";
import IconLocationArrow from "src/assets/SvgIcons/IconLocationArrow";
import Spinner from "src/assets/SvgIcons/Spinner";

import Button from "src/components/shared/Buttons/Button";
import IconButton from "src/components/shared/Buttons/IconButton";

import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import GooeyTooltip from "src/components/shared/Tooltip";
addInlineStyle(modalStyle);
addInlineStyle(buttonStyle);
addInlineStyle(leafletStyle);

// Define global Google Maps authentication failure handler type
declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

// Default map center (Seattle, WA)
const DEFAULT_MAP_CENTER: [number, number] = [47.65, -122.3];

export type LocationModalRef = {
  open: () => void;
};

export type LocationModalProps = {
  onSendLocation: (location: { latitude: number; longitude: number }) => void;
};

const LocationModal = forwardRef<LocationModalRef, LocationModalProps>(
  ({ onSendLocation }, ref) => {
    const { config } = useSystemContext();
    const googleMapsApiKey = config?.secrets?.GOOGLE_MAPS_API_KEY || "";

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{
      latitude: number;
      longitude: number;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [googleMapsError, setGoogleMapsError] = useState(false);
    const leafletMapRef = useRef<L.Map | null>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        setSelectedLocation(null);
        setError(null);
        setGoogleMapsError(false);
      },
    }));

    useGoogleMapsAuthFailure(setGoogleMapsError);

    useEffect(() => {
      if (!isOpen) return;
      getCurrentPosition({
        googleMapRef,
        leafletMapRef,
        setSelectedLocation,
        setIsRefreshing,
        setError,
      });
    }, [isOpen]);

    /* ---------- default centre ---------- */
    let leafletCenter: [number, number];
    let googleMapCenter: { lat: number; lng: number };
    if (selectedLocation) {
      leafletCenter = [selectedLocation.latitude, selectedLocation.longitude];
      googleMapCenter = {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      };
    } else {
      leafletCenter = DEFAULT_MAP_CENTER;
      googleMapCenter = {
        lat: DEFAULT_MAP_CENTER[0],
        lng: DEFAULT_MAP_CENTER[1],
      };
    }

    function handleSendLocation() {
      if (error) {
        alert(
          "Error: Unable to send location. Please resolve the issue and try again.",
        );
        return;
      }
      if (selectedLocation) {
        onSendLocation(selectedLocation);
        setIsOpen(false);
      } else {
        alert("No location selected");
      }
    }

    return (
      <div className={clsx("location-modal-overlay", { "is-open": isOpen })}>
        <div className={clsx("location-modal")}>
          {/* ─── Header ─────────────────────────────────────────────────────── */}
          <div className={clsx("modal-header")}>
            {/* Cancel */}
            <div className="flex items-center w-1/3">
              <Button
                className={clsx("button-outlined text-dark")}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>

            {/* Title */}
            <div
              className="flex-1 flex items-center justify-center font-bold"
              style={{ fontWeight: "bold" }}
            >
              <p>Send Location</p>
            </div>

            {/* Refresh */}
            <div className="flex items-center justify-end w-1/3">
              <GooeyTooltip text="Refresh Location">
                <IconButton
                  className={clsx("button-outlined text-dark centre")}
                  onClick={() =>
                    getCurrentPosition({
                      googleMapRef,
                      leafletMapRef,
                      setSelectedLocation,
                      setIsRefreshing,
                      setError,
                    })
                  }
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <div
                      style={{
                        animation: "spin 1s linear infinite",
                        width: 16,
                        height: 16,
                      }}
                    >
                      <Spinner size={16} />
                    </div>
                  ) : (
                    <IconLocationArrow size={16} />
                  )}
                </IconButton>
              </GooeyTooltip>
            </div>
          </div>

          {/* ─── Map section ─────────────────────────────────────────────────── */}
          <div className={clsx("location-map error-text")}>
            {error ? (
              <p className="p-4 text-center text-red-600">{error}</p>
            ) : googleMapsApiKey ? (
              <GoogleMapView
                googleMapsApiKey={googleMapsApiKey}
                center={googleMapCenter}
                setSelectedLocation={setSelectedLocation}
                googleMapRef={googleMapRef}
                googleMapsError={googleMapsError}
                setGoogleMapsError={setGoogleMapsError}
              />
            ) : (
              <LeafletMapView
                center={leafletCenter}
                setSelectedLocation={setSelectedLocation}
                leafletMapRef={leafletMapRef}
                isOpen={isOpen}
              />
            )}
          </div>

          {/* ─── Footer / actions ───────────────────────────────────────────── */}
          <div
            className={clsx("modal-actions d-flex justify-center")}
            style={{ flexShrink: 0 }}
          >
            <Button
              className="w-100"
              variant="outlined"
              onClick={handleSendLocation}
              disabled={!selectedLocation}
            >
              📍 Send this location
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

export default LocationModal;

function getCurrentPosition({
  googleMapRef,
  leafletMapRef,
  setSelectedLocation,
  setIsRefreshing,
  setError,
}: {
  googleMapRef: React.MutableRefObject<google.maps.Map | null>;
  leafletMapRef: React.MutableRefObject<L.Map | null>;
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  setIsRefreshing: (refreshing: boolean) => void;
  setError: (err: string | null) => void;
}) {
  if (typeof navigator.geolocation === "undefined") {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  setIsRefreshing(true);

  async function onSuccess({ coords }: GeolocationPosition) {
    // Delay to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSelectedLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setError(null);
    setIsRefreshing(false);

    // Move the map view to the new location
    if (googleMapRef.current) {
      googleMapRef.current.panTo({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      googleMapRef.current.setZoom(15);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([coords.latitude, coords.longitude], 15, {
        animate: true,
        duration: 0.5,
      });
    } else {
      console.warn("Google map or Leaflet map is not fully initialized.");
    }
  }

  async function onError() {
    setError("Unable to retrieve location. Please enable location services.");
    setIsRefreshing(false);
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function GoogleMapView({
  googleMapsApiKey,
  center,
  setSelectedLocation,
  googleMapRef,
  googleMapsError,
  setGoogleMapsError,
}: {
  googleMapsApiKey: string;
  center: { lat: number; lng: number };
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  googleMapRef: React.MutableRefObject<google.maps.Map | null>;
  googleMapsError: boolean;
  setGoogleMapsError: (error: boolean) => void;
}) {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <APIProvider
        apiKey={googleMapsApiKey}
        onError={(e) => {
          console.error("Google Maps API error:", e);
          setGoogleMapsError(true);
        }}
      >
        <Map
          style={{ height: "100%", width: "100%" }}
          defaultCenter={center}
          defaultZoom={15}
          controlSize={26}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId="DEMO_MAP_ID"
        />
        <GoogleMapCenterWatcher
          setSelectedLocation={setSelectedLocation}
          mapRef={googleMapRef}
        />
      </APIProvider>

      {!googleMapsError && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <LocationMarker />
        </div>
      )}
    </div>
  );
}

function GoogleMapCenterWatcher({
  setSelectedLocation,
  mapRef,
}: {
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    mapRef.current = map;

    // Set up listener for center changes
    const listener = map.addListener("idle", () => {
      const center = map.getBounds()?.getCenter();
      if (!center) return;
      setSelectedLocation({
        latitude: center.lat(),
        longitude: center.lng(),
      });
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, mapRef, setSelectedLocation]);

  return null;
}

function useGoogleMapsAuthFailure(
  setGoogleMapsError: (error: boolean) => void,
) {
  useEffect(() => {
    const previousHandler = window.gm_authFailure;

    window.gm_authFailure = () => {
      console.error("Google Maps authentication failed - API key issue");
      setGoogleMapsError(true);

      if (typeof previousHandler === "function") {
        previousHandler();
      }
    };

    return () => {
      if (previousHandler) {
        window.gm_authFailure = previousHandler;
      } else {
        delete window.gm_authFailure;
      }
    };
  }, [setGoogleMapsError]);
}

function LeafletMapView({
  center,
  setSelectedLocation,
  leafletMapRef,
  isOpen,
}: {
  center: [number, number];
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  leafletMapRef: React.MutableRefObject<L.Map | null>;
  isOpen: boolean;
}) {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        key={`leaflet-map-${isOpen.toString()}`}
        center={center}
        zoom={15}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LeafletCenterWatcher
          setSelectedLocation={setSelectedLocation}
          mapRef={leafletMapRef}
        />
      </MapContainer>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <LocationMarker />
      </div>
    </div>
  );
}

function LeafletCenterWatcher({
  setSelectedLocation,
  mapRef,
}: {
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMapEvents({
    moveend: (event) => {
      const center = event.target.getCenter().wrap();
      setSelectedLocation({
        latitude: center.lat,
        longitude: center.lng,
      });
    },
  });

  useEffect(() => {
    if (!map) return;
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
}
