import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import enTranslations from "./en.json";
import zhTranslations from "./zh.json";
import {TLanguage} from "../types/lang.type";

const obj = localStorage.getItem("i18nextLng");

const parseObj: TLanguage = JSON.parse(obj as string);

const resources = {
	en: {translation: enTranslations},
	zh: {translation: zhTranslations},
};

i18n.use(initReactI18next).init({
	resources,
	lng: parseObj?.value || "en",
	fallbackLng: "en",
});

export default i18n;
