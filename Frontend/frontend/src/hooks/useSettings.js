import { useEffect, useState } from "react";
import {
  getDetectionConfig,
  updateDetectionConfig,
} from "../services/detectionConfigApi";
export const DEFAULT_SETTINGS = {
  criticalAlerts: true,
  highAlerts: true,
  mediumAlerts: false,
  autoRefresh: true,
  refreshInterval: "30",
  timezone: "Asia/Kolkata",
  failedLoginThreshold: 5,
  detectionWindow: 5,
};

const STORAGE_KEY = "netsentry-settings";

function readSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...DEFAULT_SETTINGS };

    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export default function useSettings() {
  const [settings, setSettings] = useState(readSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
  let active = true;

  async function loadDetectionSettings() {
    try {
      const config = await getDetectionConfig();

      if (!active) return;

      setSettings((previous) => ({
        ...previous,
        failedLoginThreshold: config.failedLoginThreshold,
        detectionWindow: config.detectionWindow,
      }));
    } catch (error) {
      console.error("Could not load detection settings:", error);
    }
  }

  loadDetectionSettings();

  return () => {
    active = false;
  };
}, []);

  function updateSetting(key, value) {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  }

  
async function saveSettings() {
  try {
    // Save detection rules to the backend first.
    await updateDetectionConfig({
      failedLoginThreshold: settings.failedLoginThreshold,
      detectionWindow: settings.detectionWindow,
    });

    // Save the remaining UI preferences locally.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    setSaved(true);
    return true;
  } catch (error) {
    setSaved(false);
    throw error;
  }
}


  function resetSettings() {
    const defaults = { ...DEFAULT_SETTINGS };
    setSettings(defaults);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  return {
    settings,
    saved,
    updateSetting,
    saveSettings,
    resetSettings,
  };
}
