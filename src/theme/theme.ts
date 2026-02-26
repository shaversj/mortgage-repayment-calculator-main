import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Plus Jakarta Sans, sans-serif",
  components: {
    Button: {
      styles: {
        root: {
          "--button-hover": "var(--mantine-color-lime-3)",
          "--button-hover-color": "#e1e558",
        },
      },
    },
    Radio: {
      styles: {
        root: {
          borderRadius: "4px",
          padding: "12.5px 16px",
        },
        label: {
          fontSize: "18px",
          fontWeight: 700,
          lineHeight: "125%",
        },
      },
    },
  },
  headings: {
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: "56px",
        lineHeight: "1.25",
      },
      h2: {
        fontSize: "24px",
        lineHeight: "1.25",
      },
      h3: {
        fontSize: "18px",
        lineHeight: "1.25",
      },
    },
  },
  fontSizes: {
    xs: "14px", // text preset 5
    sm: "16px", // text preset 4
    md: "18px",
    lg: "24px",
    xl: "56px",
  },

  lineHeights: {
    xs: "1.5",
    sm: "1.5",
    md: "1.25",
    lg: "1.25",
    xl: "1.25",
  },

  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
  },
  primaryColor: "lime",
  colors: {
    lime: [
      "#f9fae3",
      "#f1f3b5",
      "#ebed97",
      "#e1e558",
      "#d8db2f", // 4 (your base)
      "#c4c81a",
      "#a7ad14",
      "#8a910f",
      "#6e740a",
      "#525706",
    ],

    slate: [
      "#E4F4FD", // 0
      "#cfe2ef",
      "#b8cfdf",
      "#9ABED5", // 3
      "#82abc4",
      "#6B94A8", // 5
      "#567b8e",
      "#4E6E7E", // 7
      "#2e4d60",
      "#133041", // 9
    ],

    red: [
      "#fde8e6",
      "#f8c5c1",
      "#f2a09b",
      "#ec7b75",
      "#e4564f",
      "#d73328", // base
      "#b92a20",
      "#9c2219",
      "#7e1a12",
      "#61120c",
    ],
  },

  primaryShade: {
    light: 4,
    dark: 5,
  },

  white: "#FFFFFF",
  black: "#133041",
});
