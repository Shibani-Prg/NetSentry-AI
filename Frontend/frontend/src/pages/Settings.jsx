
import { useState } from "react";

import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsActions from "../components/settings/SettingsActions";
import SystemHealthCard from "../components/settings/SystemHealthCard";
import AlertPreferences from "../components/settings/AlertPreferences";
import DashboardPreferences from "../components/settings/DashboardPreferences";
import DetectionSettings from "../components/settings/DetectionSettings";

import useSettings from "../hooks/useSettings";
import useSystemHealth from "../hooks/useSystemHealth";

function Settings() {
  const {
    settings,
    saved,
    updateSetting,
    saveSettings,
    resetSettings,
  } = useSettings();

  const { health, checking, checkConnection } = useSystemHealth();
  const [saveError, setSaveError] = useState("");

  async function handleSave() {
    setSaveError("");

    try {
      await saveSettings();
    } catch (error) {
      setSaveError(
        error.response?.data?.message ||
        error.message ||
        "Could not save settings."
      );
    }
  }


  function handleReset() {
    resetSettings();
    setSaveError("");
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SettingsHeader />

        <SettingsActions
          onSave={handleSave}
          onReset={handleReset}
          saved={saved}
          saveError={saveError}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SystemHealthCard
          health={health}
          checking={checking}
          onCheck={checkConnection}
        />

        <AlertPreferences
          settings={settings}
          updateSetting={updateSetting}
        />

        <DashboardPreferences
          settings={settings}
          updateSetting={updateSetting}
        />

        <DetectionSettings
          settings={settings}
          updateSetting={updateSetting}
        />
      </div>
    </section>
  );
}

export default Settings;
