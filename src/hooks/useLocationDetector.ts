/**
 * Location Detector Hook
 * Detects user's location using browser Geolocation API
 */

import { useState, useEffect } from "react";

export interface LocationData {
  country: string;
  countryCode: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

interface UseLocationDetectorReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  detectLocation: () => Promise<void>;
}

/**
 * Hook to detect user location
 * Uses browser Geolocation API with reverse geocoding
 */
export const useLocationDetector = (): UseLocationDetectorReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Reverse geocode coordinates to get location details
   * Using OpenStreetMap's Nominatim API (free, no API key required)
   */
  const reverseGeocode = async (
    latitude: number,
    longitude: number
  ): Promise<LocationData> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
        {
          headers: {
            "User-Agent": "DevPalace/1.0", // Required by Nominatim
          },
        }
      );

      if (!response.ok) {
        throw new Error("Reverse geocoding failed");
      }

      const data = await response.json();

      return {
        country: data.address?.country || "Unknown",
        countryCode: data.address?.country_code?.toUpperCase() || "XX",
        city: data.address?.city || data.address?.town || data.address?.village,
        latitude,
        longitude,
      };
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      // Return basic data if geocoding fails
      return {
        country: "Unknown",
        countryCode: "XX",
        latitude,
        longitude,
      };
    }
  };

  /**
   * Detect location using browser Geolocation API
   */
  const detectLocation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    try {
      // Get user's position
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get location details
      const locationData = await reverseGeocode(latitude, longitude);
      setLocation(locationData);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Location access denied. Please enable location permissions."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred while detecting location.");
        }
      } else {
        setError("Failed to detect location. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Try to load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("user-location");
    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (err) {
        console.error("Failed to parse saved location:", err);
      }
    }
  }, []);

  // Save location to localStorage when it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem("user-location", JSON.stringify(location));
    }
  }, [location]);

  return {
    location,
    isLoading,
    error,
    detectLocation,
  };
};
