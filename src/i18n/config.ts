import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import English from "../locales/en/translation.json";
import Portuguese from "../locales/pt/translation.json";

const resources = {
  en: { translation: English },
  pt: { translation: Portuguese },
};

i18n.use(initReactI18next).init({
  lng: "en",

  fallbackLng: "en",

  debug: true,

  interpolation: {
    escapeValue: false,
  },

  resources,
});

export default i18n;
