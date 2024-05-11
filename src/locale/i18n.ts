import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import enTranslations from "./en.json";
import zhTranslations from "./zh.json";

const resources = {
	en: {translation: enTranslations},
	zh: {translation: zhTranslations},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
});

export default i18n;
