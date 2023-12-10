import { languageAtom } from "core/features/language/language.atoms";
import { getLang, saveLang } from "core/features/language/language.feature";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

enum LangsEnum {
    ru = 'ru',
    en = 'en'
}

interface Lang {
    lang: LangsEnum;
    setLang: (lang: LangsEnum) => void;
}

export const LangContext = createContext<Lang>({
    lang: LangsEnum.en,
    setLang() {
        //
    }
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useRecoilState(languageAtom);

    useEffect(() => {
        getLang().then((lang) => {
            if (lang) {
                setLang(lang as LangsEnum);
            } else {
                setLang(LangsEnum.en);
            }
        });
    }, []);

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang as string);
            saveLang(lang)
        }
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLanguage = () => useContext(LangContext);
