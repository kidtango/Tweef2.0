import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from 'react';
import { ThemeSettings, storeSettings } from 'utils/settings';
import { THEMES } from 'constants/themeConstants';
import _ from 'lodash';

type SettingContextProps = {
  settings: ThemeSettings;
  saveSettings: (value: ThemeSettings) => void;
};

const SettingsContext = createContext<Partial<SettingContextProps>>({});

export const useSettingsContext = () => useContext(SettingsContext);

const defaultSettings: ThemeSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: THEMES.ONE_DARK
};

interface Props {
  settings: ThemeSettings;
  children: ReactNode;
}

const SettingsContextProvider: React.FC<Props> = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState<ThemeSettings>(
    settings || defaultSettings
  );

  const handleSaveSettings = (updatedSettings: ThemeSettings) => {
    const mergedSettings = _.merge({}, currentSettings, updatedSettings);

    setCurrentSettings(mergedSettings);
    //Store settings to local storage
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    document.dir = currentSettings.direction;
  }, [currentSettings]);

  return (
    <SettingsContext.Provider
      value={{ settings: currentSettings, saveSettings: handleSaveSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
