/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from "theme-ui";
import { FiMoon, FiSun } from "react-icons/fi";
import { darken } from "@theme-ui/color";

const Colors = (props) => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div sx={themeStyles.modeOption}>
      <button
        onClick={(e) => {
          setColorMode(colorMode === "default" ? "dark" : "default");
        }}
      >
        {colorMode === "default" ? <FiMoon /> : <FiSun />}
        <div sx={themeStyles.modeText}>
          {colorMode === "default" ? "Dark" : "Light"}
        </div>
      </button>
    </div>
  );
};
export default Colors;

const themeStyles = {
  modeOption: {
    bg: "transparent",
    button: {
      py: 2,
      px: 3,
      borderRadius: "12px",
      fontSize: 4,
      bg: darken("primaryBgColor", 0.05),
      border: "none",
      display: "flex",
      alignItems: "center",
      color: "primaryColor",
      cursor: "pointer",
      "&:hover, &:focus": {
        color: "SecondaryColor",
      },
    },
  },
  modeText: {
    fontSize: 2,
    ml: 3,
  },
};
