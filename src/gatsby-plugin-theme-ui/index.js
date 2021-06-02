import defaultColors from "../util/default-colors.json";
import darkColors from "../util/dark-theme-colors.json";
import siteLayout from "../util/siteLayout.json";
import siteFont from "../util/siteFont.json";
import { darken, lighten } from "@theme-ui/color";

const theme = {
  breakpoints: ["40em", "56em", "64em", "90em", "120em"],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fonts: {
    body: `${siteFont.body}, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif`,
    heading: `${siteFont.heading}, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif`,
    monospace: `${siteFont.monospace}, Consolas, Monaco, Liberation Mono, Lucida Console, monospace`,
  },
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  colors: {
    ...defaultColors,
    modes: {
      dark: {
        ...darkColors,
      },
    },
  },
  variants: {
    container: {
      maxWidth: siteLayout.containerLayout,
      m: "0 auto",
      px: ["20px", "20px", "40px", "40px", "80px"],
      py: "0",
    },
    moreButton: {
      mt: 4,
      display: "block",
      color: "primaryColor",
      fontSize: 3,
      fontWeight: "700",
      transition: "0.5s",
      "&:hover": {
        color: "SecondaryColor",
      },
      span: {
        pl: 2,
      },
    },
    button: {
      bg: "buttonBg",
      display: "inline-block",
      fontSize: 3,
      py: 3,
      px: 5,
      mt: 5,
      border: "none",
      cursor: "pointer",
      borderRadius: "12px",
      color: "primaryColor",
      fontWeight: "700",
      transition: "0.5s",
      "&:hover": {
        color: "SecondaryColor",
        bg: darken("buttonBg", 0.1),
      },
      span: {
        pl: 2,
      },
    },
    markdown: {
      maxWidth: ["1280px"],
      "h1, h2, h3, h4, h5, h6": {
        color: "primaryColor",
      },
      "p code": {
        fontSize: "18px",
        backgroundColor: "primaryBgColor",
        color: lighten("textColor", 0.02),
        textShadow: "none",
      },
      pre: {
        borderRadius: "12px",
      },
      img: {
        display: "block",
      },
      ".gatsby-resp-image-figure": {
        my: 6,
        mx: 0,
        ".gatsby-resp-image-wrapper": {
          maxWidth: "none !important",
        },
      },
      blockquote: {
        borderLeft: "3px solid",
        borderColor: "borderColor",
        px: 4,
        mx: 0,
        p: {
          fontSize: [3, 3, 4],
          fontWeight: "light",
        },
      },
      "blockquote, pre": {
        my: 5,
      },
      figure: {
        mx: 0,
        my: 3,
        figcaption: {
          mt: 1,
          fontSize: 0,
          textAlign: "ceter",
          color: lighten("textColor", 0.02),
        },
      },
      "p, li": {
        fontSize: 3,
        color: "textColor",
      },
      a: {
        color: "textColor",
        "&:hover": {
          color: darken("textColor", 0.05),
        },
      },
    },
    pageListPagination: {
      my: 8,
      textAlign: "center",
      ul: {
        m: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        gap: 3,
        "li ": {
          bg: "menuBgColor",
          p: 3,
          borderRadius: "3px",
          listStyle: "none",
          margin: "0 5px",
          a: {
            display: "inline-block",
            fontWeight: "bold",
            lineHeight: "1",
            fontSize: "20px",
            color: "primaryColor",
            "&:hover": {
              color: "SecondaryColor",
            },
            "&.is-active": {
              color: "SecondaryColor",
            },
          },
        },
      },
    },
    pagination: {
      my: 8,
      textAlign: "center",
      borderTop: "1px solid",
      borderColor: "borderColor",
      ul: {
        m: 0,
        p: 0,
        display: ["block", "flex"],
        justifyContent: "space-between",
        "li ": {
          listStyle: "none",
          a: {
            display: "inline-block",
            fontWeight: "bold",
            lineHeight: "1",
            fontSize: "20px",
            color: "primaryColor",
            "&:hover": {
              color: darken("primaryColor", 0.05),
            },
          },
          ".page-title": {
            display: "block",
            my: 3,
            maxWidth: "50ch",
            lineHeight: "1.3",
          },
          p: {
            fontSize: "18px",
            my: 4,
            color: "SecondaryColor",
          },
          img: {
            maxWidth: ["100%", "100%", "250px"],
            borderRadius: "12px",
          },
          "&:nth-child(1)": {
            textAlign: "left",
          },
          "&:nth-child(2)": {
            textAlign: "right",
          },
        },
      },
    },

    breadcrumb: {
      variant: "variants.container",
      ol: {
        listStyle: "none",
        mx: "auto",
        my: 0,
        py: 3,
        fontSize: 2,
        px: "0 !important",
        li: {
          display: "inline",
          mx: 2,
          "&:first-child": {
            ml: 0,
          },
        },
        a: {
          color: "textColor",
          "&:hover": {
            color: "primaryColor",
            textDecoration: "underline",
          },
        },
      },
    },
    section: {
      py: [4, 4, 7],
    },
    pageHead: {
      textAlign: "center",
      pb: 7,
      h2: {
        m: 0,
        color: "primaryColor",
        fontSize: [5, 6],
        lineHeight: "1.2",
      },
      p: {
        display: "inline-block",
        m: 0,
        mt: 2,
        maxWidth: "60ch",
        fontSize: 3,
        color: "textColor",
      },
    },
  },
};
export default theme;
