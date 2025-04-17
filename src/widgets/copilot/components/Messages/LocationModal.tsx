import { useState, useEffect, useRef } from "react";
import { useSystemContext } from "src/contexts/hooks";
import { addInlineStyle } from "src/addStyles";
import modalStyle from "./LocationModal.scss?inline";
import leafletStyle from "leaflet/dist/leaflet.css?inline";
import buttonStyle from "/src/components/shared/Buttons/buttons.scss?inline";
import clsx from "clsx";

import LocationRefresh from "src/assets/SvgIcons/LocationRefresh";
import LocationMarker from "src/assets/SvgIcons/LocationMarker";
import Spinner from "src/assets/SvgIcons/Spinner";

import Button from "src/components/shared/Buttons/Button";
import { ReplyButton } from "./IncomingMsg";
import IconButton from "src/components/shared/Buttons/IconButton";

import L from "leaflet";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
addInlineStyle(modalStyle);
addInlineStyle(buttonStyle);
addInlineStyle(leafletStyle);

// Define global Google Maps authentication failure handler type
declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

export function calculateBoundingBox(
  lat: number,
  lon: number,
  zoom: number
): [number, number, number, number] {
  const degreesPerTile = 360 / Math.pow(2, zoom);
  const halfTile = degreesPerTile / 2;

  const minLon = lon - halfTile;
  const maxLon = lon + halfTile;
  const minLat = lat - halfTile;
  const maxLat = lat + halfTile;

  return [minLon, minLat, maxLon, maxLat];
}

/** Keeps selectedLocation in sync with the map’s visual center */
function LeafletCenterWatcher({
  setSelectedLocation,
  mapRef,
}: {
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMapEvents({
    moveend: (e) => {
      const c = e.target.getCenter();
      setSelectedLocation({ latitude: c.lat, longitude: c.lng });
    },
  });

  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, [map, mapRef]);

  return null;
}

function GoogleMapCenterWatcher({
  setSelectedLocation,
  mapRef,
}: {
  center: { lat: number; lng: number };
  setSelectedLocation: (loc: { latitude: number; longitude: number }) => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}) {
  const map = useMap();

  // Store map reference
  useEffect(() => {
    if (map) {
      mapRef.current = map;

      // Set up listener for center changes
      const listener = map.addListener("idle", () => {
        const center = map.getBounds()?.getCenter();
        if (center) {
          setSelectedLocation({
            latitude: center.lat(),
            longitude: center.lng(),
          });
        }
      });

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map, mapRef, setSelectedLocation]);

  return null;
}

const LocationModal = ({
  isOpen,
  onClose,
  onSendLocation,
  buttonData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSendLocation: (
    location: { latitude: number; longitude: number },
    buttonData: { button: ReplyButton; bot_message_id: string }
  ) => void;
  buttonData: {
    button: ReplyButton;
    bot_message_id: string;
  } | null;
}) => {
  const { config } = useSystemContext();

  const hasGoogleMapsKey = !!config?.apiKeys?.GoogleMapsAPI;
  const googleMapsApiKey = config?.apiKeys?.GoogleMapsAPI || "";

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState(false);
  const leafletMapRef = useRef<L.Map | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const locationInitialized = useRef(false);

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
  }, []);

  /** Grab current position the first time the modal opens */
  useEffect(() => {
    if (!isOpen) {
      locationInitialized.current = false;
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    if (!locationInitialized.current) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const newLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };

          setSelectedLocation(newLocation);
          setError(null);
          // Update map centers
          setTimeout(() => {
            // Give time for maps to initialize
            if (googleMapRef.current) {
              googleMapRef.current.panTo({
                lat: newLocation.latitude,
                lng: newLocation.longitude,
              });
              // Only set zoom initially, not on every update
              if (!locationInitialized.current) {
                googleMapRef.current.setZoom(15);
              }
            }

            if (leafletMapRef.current) {
              leafletMapRef.current.setView(
                [newLocation.latitude, newLocation.longitude],
                // Only set zoom initially, not on every update
                locationInitialized.current
                  ? leafletMapRef.current.getZoom()
                  : 15,
                { animate: false }
              );
            }
          }, 300);

          locationInitialized.current = true;
        },
        (_) => {
          alert(
            "Unable to retrieve location. Please enable location services."
          );
        }
      );
    }
  }, [isOpen]);

  const handleSendLocation = () => {
    if (error) {
      alert(
        "Error: Unable to send location. Please resolve the issue and try again."
      );
      return;
    }
    if (selectedLocation && buttonData) {
      onSendLocation(selectedLocation, buttonData);
      onClose();
    } else {
      alert("No location selected");
    }
  };

  const refreshLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setIsRefreshing(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const newLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        //delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));

        setSelectedLocation(newLocation);
        setError(null);
        setIsRefreshing(false);

        // Move the map view to the new location
        if (hasGoogleMapsKey && googleMapRef.current) {
          googleMapRef.current.panTo({
            lat: newLocation.latitude,
            lng: newLocation.longitude,
          });
          googleMapRef.current.setZoom(15);
        } else if (leafletMapRef.current) {
          leafletMapRef.current.flyTo(
            [newLocation.latitude, newLocation.longitude],
            15,
            { animate: true, duration: 0.5 }
          );
        } else {
          console.warn("Leaflet map is not fully initialized yet.");
        }
      },
      (_) => {
        alert("Unable to refresh location. Please enable location services.");
        setIsRefreshing(false);
      }
    );
  };

  /* ---------- default centre ---------- */
  const leafletCenter: [number, number] = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [47.65, -122.3];

  const googleMapCenter = {
    lat: selectedLocation ? selectedLocation.latitude : 47.65,
    lng: selectedLocation ? selectedLocation.longitude : -122.3,
  };

  const renderGoogleMap = () => (
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
          defaultCenter={googleMapCenter}
          defaultZoom={15}
          controlSize={26}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId="DEMO_MAP_ID"
        >
          <GoogleMapCenterWatcher
            center={googleMapCenter}
            setSelectedLocation={setSelectedLocation}
            mapRef={googleMapRef}
          />
        </Map>
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

  const renderLeafletMap = () => (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        key={`leaflet-map-${isOpen.toString()}`}
        center={leafletCenter}
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

  return (
    <div className={clsx("location-modal-overlay", { "is-open": isOpen })}>
      <div className={clsx("location-modal")}>
        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <div className={clsx("modal-header")}>
          {/* Cancel */}
          <div className="flex items-center w-1/3">
            <Button
              className={clsx("button-outlined text-dark")}
              onClick={onClose}
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
            <IconButton
              className={clsx("button-outlined text-dark centre")}
              onClick={refreshLocation}
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
                <LocationRefresh size={16} />
              )}
            </IconButton>
          </div>
        </div>

        {/* ─── Map section ─────────────────────────────────────────────────── */}
        <div className={clsx("location-map error-text")}>
          {error ? (
            <p className="p-4 text-center text-red-600">{error}</p>
          ) : hasGoogleMapsKey ? (
            renderGoogleMap()
          ) : (
            renderLeafletMap()
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
};

export default LocationModal;
