import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import enTranslations from "./en.json";
import chTranslations from "./ch.json"; // Import Chinese translations

const resources = {
	en: {translation: enTranslations},
	ch: {translation: chTranslations}, // Add Chinese translations
};

i18n.use(initReactI18next).init({
	debug: true,
	resources,
	lng: "en",
	fallbackLng: "en",

	interpolation: {
		escapeValue: false,
	},

	// Optional: add other options here
});

export default i18n;
