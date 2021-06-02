/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import site from "../util/site.json";
import Navigation from "./navigation";

const siteTitle = site.meta.title;
const image = site.meta.logoImage;
const showLogo = site.meta.showLogo;
const showTitle = site.meta.showTitle;
const Logo = (sx) => (
  <div sx={styles.siteLogo}>
    {showLogo === true
      ? image && (
          <Link to="/">
            <img src={image.slice(15)} alt={siteTitle} />
          </Link>
        )
      : ""}
    {showTitle === true ? <Link to="/">{siteTitle}</Link> : ""}
    <div sx={styles.navMenuBigScreen}>
      <Navigation />
    </div>
  </div>
);

export default Logo;

const styles = {
  siteLogo: {
    display: "flex",
    justifyContent: ["center", "center", "left"],
    alignItems: "center",
    fontSize: 4,
    textAlign: ["center", "center", "left"],
    a: {
      color: "primaryColor",
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        color: "header.logoColor",
      },
    },
    img: {
      maxHeight: "36px",
      mr: 2,
      display: "block",
    },
  },
  navMenuBigScreen: {
    display: ["none", "none", "none", "flex"],
  },
};
