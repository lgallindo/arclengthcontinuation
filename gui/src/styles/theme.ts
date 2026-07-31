// All vscode variables https://gist.github.com/estruyf/ba49203e1a7d6868e9320a4ea480c27a
// Examples for vscode https://github.com/githubocto/tailwind-vscode/blob/main/index.js
//
// Fallback defaults when host IDE CSS vars are absent: PRODUCT_IDENTITY neutrals
// (docs/PRODUCT_IDENTITY.md — Paper/Ink/Slate/Haze/Indigo/Oxide/Sage). Pages site chrome
// stays separate and must not be restyled with this matte brand.

// Dark ink-field with slate/oxide accents (not Continue lavender / SaaS blue)
export const THEME_COLORS = {
  background: {
    vars: [
      "--vscode-sideBar-background",
      "--vscode-editor-background",
      "--vscode-panel-background",
    ],
    default: "#2C2A28", // Ink
  },
  foreground: {
    vars: [
      "--vscode-sideBar-foreground",
      "--vscode-editor-foreground",
      "--vscode-panel-foreground",
    ],
    default: "#D8D8C0", // Parchment
  },
  "editor-background": {
    vars: ["--vscode-editor-background"],
    default: "#2C2A28", // Ink
  },
  "editor-foreground": {
    vars: ["--vscode-editor-foreground"],
    default: "#D8D8C0", // Parchment
  },
  "primary-background": {
    vars: ["--vscode-button-background"],
    default: "#787890", // Slate
  },
  "primary-foreground": {
    vars: ["--vscode-button-foreground"],
    default: "#E8E2D6", // Paper
  },
  "primary-hover": {
    vars: ["--vscode-button-hoverBackground"],
    default: "#9090A8", // Haze
  },
  "secondary-background": {
    vars: ["--vscode-button-secondaryBackground"],
    default: "#606078", // Indigo
  },
  "secondary-foreground": {
    vars: ["--vscode-button-secondaryForeground"],
    default: "#D8D8D8", // Mist
  },
  "secondary-hover": {
    vars: ["--vscode-button-secondaryHoverBackground"],
    default: "#787890", // Slate
  },
  border: {
    vars: ["--vscode-sideBar-border", "--vscode-panel-border"],
    default: "#909090", // Ash
  },
  "border-focus": {
    vars: ["--vscode-focusBorder"],
    default: "#A65D3F", // Oxide
  },
  // Command styles are used for tip-tap editor
  "command-background": {
    vars: ["--vscode-commandCenter-background"],
    default: "#606078", // Indigo
  },
  "command-foreground": {
    vars: ["--vscode-commandCenter-foreground"],
    default: "#D8D8C0", // Parchment
  },
  "command-border": {
    vars: ["--vscode-commandCenter-inactiveBorder"],
    default: "#A8A8A8", // Stone
  },
  "command-border-focus": {
    vars: ["--vscode-commandCenter-activeBorder"],
    default: "#A65D3F", // Oxide
  },
  description: {
    vars: ["--vscode-descriptionForeground"],
    default: "#C0C0C0", // Silver
  },
  "description-muted": {
    vars: ["--vscode-list-deemphasizedForeground"],
    default: "#909090", // Ash
  },
  "input-background": {
    vars: ["--vscode-input-background"],
    default: "#606078", // Indigo
  },
  "input-foreground": {
    vars: ["--vscode-input-foreground"],
    default: "#E8E2D6", // Paper
  },
  "input-border": {
    vars: [
      "--vscode-input-border",
      "--vscode-commandCenter-inactiveBorder",
      "vscode-border",
    ],
    default: "#A8A8A8", // Stone
  },
  "input-placeholder": {
    vars: ["--vscode-input-placeholderForeground"],
    default: "#909090", // Ash
  },
  "table-oddRow": {
    vars: ["--vscode-tree-tableOddRowsBackground"],
    default: "#606078", // Indigo
  },
  "badge-background": {
    vars: ["--vscode-badge-background"],
    default: "#787890", // Slate
  },
  "badge-foreground": {
    vars: ["--vscode-badge-foreground"],
    default: "#E8E2D6", // Paper
  },
  info: {
    vars: [
      "--vscode-charts-blue",
      "--vscode-notebookStatusRunningIcon-foreground",
    ],
    default: "#787890", // Slate
  },
  success: {
    vars: [
      "--vscode-notebookStatusSuccessIcon-foreground",
      "--vscode-testing-iconPassed",
      "--vscode-gitDecoration-addedResourceForeground",
      "--vscode-charts-green",
    ],
    default: "#7A8F6E", // Sage
  },
  warning: {
    vars: [
      "--vscode-editorWarning-foreground",
      "--vscode-list-warningForeground",
    ],
    default: "#A65D3F", // Oxide (fold accent as caution)
  },
  error: {
    vars: ["--vscode-editorError-foreground", "--vscode-list-errorForeground"],
    default: "#A65D3F", // Oxide
  },
  link: {
    vars: ["--vscode-textLink-foreground"],
    default: "#9090A8", // Haze
  },
  terminal: {
    vars: ["--vscode-terminal-ansiGreen"],
    default: "#7A8F6E", // Sage (matte; not CRT neon)
  },
  textCodeBlockBackground: {
    vars: ["--vscode-textCodeBlock-background"],
    default: "#2C2A28", // Ink
  },
  accent: {
    vars: ["--vscode-tab-activeBorderTop", "--vscode-focusBorder"],
    default: "#A65D3F", // Oxide
  },
  "find-match": {
    vars: ["--vscode-editor-findMatchBackground"], // Can't get "var(--vscode-editor-findMatchBackground, rgba(237, 18, 146, 0.5))" to work
    default: "#78789040", // translucent Slate
  },
  "find-match-selected": {
    vars: ["--vscode-editor-findMatchHighlightBackground"],
    default: "#A65D3F40", // translucent Oxide
  },
  "list-hover": {
    // --vscode-tab-hoverBackground
    vars: ["--vscode-list-hoverBackground"],
    default: "#606078", // Indigo
  },
  "list-active": {
    vars: ["--vscode-list-activeSelectionBackground"],
    default: "#78789080", // translucent Slate
  },
  "list-active-foreground": {
    vars: ["--vscode-list-activeSelectionForeground"],
    default: "#E8E2D6", // Paper
  },
};

// TODO: add fonts - GUI fonts in jetbrains differ from IDE:
// --vscode-editor-font-family;
// --vscode-font-family;
export const THEME_CSS_VARS = Object.values(THEME_COLORS)
  .map((value) => value.vars)
  .flat();

export const THEME_CSS_VAR_DEFAULTS = Object.entries(THEME_COLORS).reduce(
  (acc, [_, value]) => {
    value.vars.forEach((varName) => {
      acc[varName] = value.default;
    });
    return acc;
  },
  {} as Record<string, string>,
);

export const THEME_DEFAULTS = Object.entries(THEME_COLORS).reduce(
  (acc, [key, value]) => {
    acc[key] = value.default;
    return acc;
  },
  {} as Record<string, string>,
);

// Generates recursive CSS variable fallback for a given color name
// e.g. var(--vscode-button-background, var(--vscode-button-foreground, #ffffff))
export const getRecursiveVar = (vars: string[], defaultColor: string) => {
  return [...vars].reverse().reduce((curr, varName) => {
    return `var(${varName}, ${curr})`;
  }, defaultColor);
};

export const varWithFallback = (colorName: keyof typeof THEME_COLORS) => {
  const themeVals = THEME_COLORS[colorName];
  if (!themeVals) {
    throw new Error(`Invalid theme color name ${colorName}`);
  }
  return getRecursiveVar(themeVals.vars, themeVals.default);
};

export const setDocumentStylesFromTheme = (
  theme: Record<string, string | undefined | null>,
) => {
  // Check for extraneous theme items
  Object.entries(theme).forEach(([colorName, value]) => {
    const themeVals = THEME_COLORS[colorName as keyof typeof THEME_COLORS];
    if (!themeVals) {
      console.warn(
        `Receieved theme color ${colorName} which is not used by the theme`,
      );
      return;
    }
  });

  // Write theme values to document
  const missingColors: string[] = [];
  Object.entries(THEME_COLORS).forEach(([colorName, settings]) => {
    let colorVal = settings.default;
    const newColor = theme[colorName];
    if (newColor) {
      colorVal = newColor;
      // Remove alpha channel from all hex colors (seems to cause bad colors)
      if (newColor.startsWith("#") && newColor.length > 7) {
        colorVal = colorVal.slice(0, 7);
      }
    } else {
      missingColors.push(colorName);
      // console.warn(
      //   `Missing theme color: ${colorName}. Falling back to default ${colorVal}`,
      // );
    }

    localStorage.setItem(colorName, colorVal);
    for (const cssVar of settings.vars) {
      document.body.style.setProperty(cssVar, colorVal);
      document.documentElement.style.setProperty(cssVar, colorVal);
    }
  });

  return missingColors;
};

export const setDocumentStylesFromLocalStorage = (checkCache: boolean) => {
  for (const [colorName, themeVals] of Object.entries(THEME_COLORS)) {
    for (const cssVar of themeVals.vars) {
      // Get cached values (for non-vscode IDEs)
      if (checkCache) {
        const cached = localStorage.getItem(colorName);
        if (cached) {
          document.body.style.setProperty(cssVar, cached);
        }
      }
    }
  }
};

export const clearThemeLocalCache = () => {
  for (const colorName of Object.keys(THEME_COLORS)) {
    localStorage.removeItem(colorName);
  }
};
