export interface ThemeSettings {
  direction?: 'ltr' | 'rtl';
  responsiveFontSizes: boolean;
  theme?: 'LIGHT' | 'ONE_DARK' | 'UNICORN';
}

export function restoreSettings() {
  let settings: ThemeSettings | null = null;

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    // If stored data is not stringified JSON this might fail
    // that's why we catch the error
    console.log(err);
  }

  return settings;
}

export function storeSettings(settings: ThemeSettings): void {
  localStorage.setItem('settings', JSON.stringify(settings));
}
