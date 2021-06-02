/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import Logo from "./logo";
import Navigation from "./navigation";
import siteLayout from "../util/siteLayout.json";

const Header = () => {
  return (
    <header sx={headerStyles.siteHeader}>
      <div sx={headerStyles.container}>
        <Logo />
        <div sx={headerStyles.buttons}>
          <Link sx={headerStyles.buttons1} to="/signin">
            Login
          </Link>
          <Link sx={headerStyles.buttons2} to="/signup">
            Get Started
          </Link>
        </div>
        <div sx={headerStyles.navIcons}>
          <div sx={headerStyles.navMenu}>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const headerStyles = {
  siteHeader: {
    bg: "headerBg",
  },
  navMenuBigScreen: {
    display: ["none", "none", "none", "flex"],
  },
  navMenu: {
    display: ["block", "block", "block", "none"],
    ".site-menu": {
      display: "none",
    },
  },
  container: {
    maxWidth: siteLayout.headerLayout,
    m: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pl: ["20px", "20px", "40px", "40px", "80px"],
    pr: ["0", "0", "40px", "40px", "80px"],
  },
  navIcons: {
    display: ["flex", "flex", "flex", "none"],
    float: ["right", "right", "inherit"],
  },
  buttons: {
    display: ["none", "none", "none", "flex"],
    fontSize: "18px",
    fontWeight: "600",
    alignItems: "center",
  },
  buttons1: {
    color: "primaryColor",
    "&:hover": {
      color: "SecondaryColor",
    },
  },
  buttons2: {
    py: 2,
    px: 3,
    ml: 5,
    borderRadius: "6px",
    color: "primaryColor",
    bg: "buttonBg",
    "&:hover": {
      color: "SecondaryColor",
    },
  },
};
