/* eslint-disable @typescript-eslint/no-explicit-any */
import { themes } from "@/registry/theme";

interface Theme {
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export type CSSVariables = Record<string, string>;

export const setThemeVariables = (variables: CSSVariables) => {
    if (!variables) {
        console.error("variables is undefined or null");
        return;
    }
    
    const root = document.documentElement;
    Object.keys(variables).forEach((key) => {
        const value = variables[key];
        if (value === undefined || value === null) {
            console.warn(`Skipping undefined or null value for ${key}`);
        } else {
            root.style.setProperty(key, value);
        }
    });
};

export function getThemeVariables(theme: Theme, radius: number): { light: CSSVariables; dark: CSSVariables } {
  const { cssVars } = theme;

  const lightColors = cssVars.light || {};
  const darkColors = cssVars.dark || {};

  const generateCSSVariables = (colorSet: CSSVariables): CSSVariables => {
    if (!colorSet) {
      console.error("colorSet is undefined or null");
      return {};
    }

    return {
      '--background': colorSet["background"],
      '--foreground': colorSet["foreground"],
      '--card': colorSet["card"],
      '--card-foreground': colorSet["card-foreground"],
      '--popover': colorSet["popover"],
      '--popover-foreground': colorSet["popover-foreground"],
      '--primary': colorSet["primary"],
      '--primary-foreground': colorSet["primary-foreground"],
      '--secondary': colorSet["secondary"],
      '--secondary-foreground': colorSet["secondary-foreground"],
      '--muted': colorSet["muted"],
      '--muted-foreground': colorSet["muted-foreground"],
      '--accent': colorSet["accent"],
      '--accent-foreground': colorSet["accent-foreground"],
      '--destructive': colorSet["destructive"],
      '--destructive-foreground': colorSet["destructive-foreground"],
      '--border': colorSet["border"],
      '--input': colorSet["input"],
      '--ring': colorSet["ring"],
      '--radius': `${radius}rem`,
      '--chart-1': colorSet["chart-1"],
      '--chart-2': colorSet["chart-2"],
      '--chart-3': colorSet["chart-3"],
      '--chart-4': colorSet["chart-4"],
      '--chart-5': colorSet["chart-5"],
    };
  };

  return {
    light: generateCSSVariables(lightColors),
    dark: generateCSSVariables(darkColors),
  };
}

export function getIndexByName(name:string) {
  return themes && themes.findIndex(themeItem => themeItem.name === name);
}

export function getSystemTheme(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export const setStyles = (config:any) => {
  const body = document.body;
  const oldThemeClass = Array.from(body.classList).find(className => className.startsWith('theme-'));
  if (oldThemeClass) {
    body.classList.replace(oldThemeClass, `theme-${config.theme}`);
  } else {
    body.classList.add(`theme-${config.theme}`);
  }
  
  body.style.setProperty('--radius', `${config.radius}rem`);
  body.style.setProperty('font-family', `var(--${config.font})`);
};

export function getLightValues(themeName:string) {
  const theme = themes.find(t => t.name === themeName);
  return theme ? theme.activeColor.light : null;
}