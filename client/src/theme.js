
export const darkModeColors = {
    grey: {
        0: "#ffffff", // manually adjusted
        10: "#f6f6f6", // manually adjusted
        50: "#f0f0f0", // manually adjusted
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
        1000: "#000000", // manually adjusted
    },
    primary: {
        // honolulu blue
        100: "#cce4f0",
        200: "#99c9e2",
        300: "#66add3",
        400: "#3392c5",
        500: "#0077b6",
        600: "#005f92",
        700: "#00476d",
        800: "#003049",
        900: "#001824"
    },
    secondary: {
        // yellow
        50: "#f0f0f0", // manually adjusted
        100: "#fff6e0",
        200: "#ffedc2",
        300: "#ffe3a3",
        400: "#ffda85",
        500: "#ffd166",
        600: "#cca752",
        700: "#997d3d",
        800: "#665429",
        900: "#332a14",
    },

}

// function that reverses the color palette
function reverseTokens(darkModeColors) {
    const reversedTokens = {};
    Object.entries(darkModeColors).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const lightModeColors = reverseTokens(darkModeColors);

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        ...darkModeColors.primary,
                        main: darkModeColors.primary[400],
                        light: darkModeColors.primary[400],
                    },
                    secondary: {
                        ...darkModeColors.secondary,
                        main: darkModeColors.secondary[300],
                    },
                    neutral: {
                        ...darkModeColors.grey,
                        main: darkModeColors.grey[500],
                    },
                    background: {
                        default: darkModeColors.primary[600],
                        alt: darkModeColors.primary[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        ...lightModeColors.primary,
                        main: lightModeColors.grey[50],
                        light: lightModeColors.grey[100],
                    },
                    secondary: {
                        ...lightModeColors.secondary,
                        main: lightModeColors.secondary[600],
                        light: lightModeColors.secondary[700],
                    },
                    neutral: {
                        ...lightModeColors.grey,
                        main: lightModeColors.grey[500],
                    },
                    background: {
                        default: lightModeColors.grey[0],
                        alt: lightModeColors.grey[50],
                    },
                }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};