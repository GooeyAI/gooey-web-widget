import { useState, useEffect } from "react";

import { addInlineStyle } from "src/addStyles";
import modalstyle from "./LocationModal.scss?inline";
import buttonstyle from "/src/components/shared/Buttons/buttons.scss?inline";
import clsx from "clsx";
import LocationRefresh from "src/assets/SvgIcons/LocationRefresh";
import Spinner from "src/assets/SvgIcons/Spinner";
import Button from "src/components/shared/Buttons/Button";
import { ReplyButton } from "./IncomingMsg";
import IconButton from "src/components/shared/Buttons/IconButton";

addInlineStyle(modalstyle);
addInlineStyle(buttonstyle);

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
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [mapRefreshKey, setMapRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setSelectedLocation({ latitude, longitude });
            setError(null);
          },
          (err) => {
            console.error("Error retrieving location:", err.message);
            alert(
              "Error: Unable to retrieve location. Please enable location services."
            );
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setError("Geolocation is not supported by your browser.");
      }
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
      // Pass location and buttonData to onSendLocation
      onSendLocation(selectedLocation, buttonData);
      onClose();
    } else {
      alert("No location selected");
    }
  };

  const zoomLevel = 15;
  let bbox = "";

  if (selectedLocation) {
    const [minLon, minLat, maxLon, maxLat] = calculateBoundingBox(
      selectedLocation.latitude,
      selectedLocation.longitude,
      zoomLevel
    );
    bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  }

  return (
    <div className={clsx("location-modal-overlay", { "is-open": isOpen })}>
      <div className={clsx("location-modal")}>
        {/* Top buttons */}
        <div className={clsx("modal-header")}>
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "33%",
            }}
          >
            <Button
              className={clsx("button-outlined text-dark")}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
          <div
            style={{
              fontWeight: "bold",
              textAlign: "center",
              flex: "1 1 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Send Location
          </div>
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "33%",
            }}
          >
            <IconButton
              className={clsx("button-outlined text-dark centre")}
              onClick={() => {
                setIsRefreshing(true); // Start spinner
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      setTimeout(() => {
                        setSelectedLocation({ latitude, longitude });
                        setError(null);
                        setIsRefreshing(false); // Stop spinner after timeout
                        setMapRefreshKey((prevKey) => prevKey + 1); // Force map re-render
                      }, 250);
                    },
                    (err) => {
                      console.error("Error refreshing location:", err.message);
                      setTimeout(() => {
                        setError(
                          "Unable to refresh location. Please enable location services."
                        );
                        setIsRefreshing(false); // Stop spinner after timeout
                        setMapRefreshKey((prevKey) => prevKey + 1); // Force map re-render
                      }, 250);
                    }
                  );
                } else {
                  console.error(
                    "Geolocation is not supported by this browser."
                  );
                  setTimeout(() => {
                    setError("Geolocation is not supported by your browser.");
                    setIsRefreshing(false); // Stop spinner after timeout
                    setMapRefreshKey((prevKey) => prevKey + 1); // Force map re-render
                  }, 500);
                }
              }}
            >
              {isRefreshing ? (
                <div
                  style={{
                    animation: "spin 1s linear infinite",
                    width: "16px",
                    height: "16px",
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

        {/* Map Section */}
        <div className={clsx("location-map error-text")}>
          {error ? (
            <p>{error}</p>
          ) : (
            <iframe
              key={mapRefreshKey} // Use mapRefreshKey to force re-render
              width="100%"
              height="100%"
              src={
                selectedLocation
                  ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${selectedLocation.latitude},${selectedLocation.longitude}`
                  : `https://www.openstreetmap.org/export/embed.html?bbox=-0.1,-0.1,0.1,0.1&layer=mapnik&marker=0,0`
              }
            ></iframe>
          )}
        </div>

        {/* Bottom button */}
        <div
          className={clsx("modal-actions d-flex justify-center")}
          style={{
            flexShrink: 0,
          }}
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
