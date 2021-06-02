/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import SocialIcons from "./social-media-icons";
import FooterData from "../util/footer.json";
import FooterMenu from "../util/footerMenu.json";
import siteLayout from "../util/siteLayout.json";
import { darken } from "@theme-ui/color";
import { RiAppleFill, RiGooglePlayFill } from "react-icons/ri";
import Theme from "../components/theme";

const footerStyles = {
  footerContainer: {
    py: 5,
    maxWidth: siteLayout.footerLayout,
    m: "0 auto",
    px: ["20px", "20px", "40px", "40px", "80px"],
  },
  footerSubContainer: {
    maxWidth: siteLayout.footerLayout,
    m: "0 auto",
    px: ["20px", "20px", "40px", "40px", "80px"],
    py: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLinks: {
    h3: {
      mt: 0,
      color: "primaryColor",
    },
    display: "grid",
    gridTemplateColumns: [
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
      "repeat(6, 1fr)",
    ],
    gap: "30px",
    ul: {
      pl: 0,
      m: 0,
    },
    "ul li": {
      display: "block",
      fontSize: 2,
      mb: 1,
    },
    "ul li a": {
      color: "textColor",
      "&:hover": {
        color: "SecondaryColor",
      },
    },
  },
  copyrightText: {
    fontSize: 2,
    m: 0,
    color: "textColor",
    a: {
      color: "primaryColor",
    },
  },
  appBtn: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    border: "none",
    borderRadius: "6px",
    p: 3,
    mb: 3,
    width: "160px",
    bg: darken("primaryBgColor", 0.05),
  },
  appIcon: {
    fontSize: 5,
    mr: 2,
    color: "textColor",
  },
  appData: {
    a: {
      fontSize: "10px",
      color: "textColor",
      span: {
        fontSize: 2,
        display: "block",
      },
    },
  },
};

const menuLink1 = FooterMenu.footerLinks1;
const link1 = menuLink1.map((links, index) => {
  return (
    <li key={"fLinks" + index}>
      <a href={links.url} rel="noreferrer">
        {links.title}
      </a>
    </li>
  );
});
const menuLink2 = FooterMenu.footerLinks2;
const link2 = menuLink2.map((links, index) => {
  return (
    <li key={"fLinks" + index}>
      <a href={links.url} rel="noreferrer">
        {links.title}
      </a>
    </li>
  );
});
const menuLink3 = FooterMenu.footerLinks3;
const link3 = menuLink3.map((links, index) => {
  return (
    <li key={"fLinks" + index}>
      <a href={links.url} rel="noreferrer">
        {links.title}
      </a>
    </li>
  );
});
const menuLink4 = FooterMenu.footerLinks4;
const link4 = menuLink4.map((links, index) => {
  return (
    <li key={"fLinks" + index}>
      <a href={links.url} rel="noreferrer">
        {links.title}
      </a>
    </li>
  );
});
const menuLink5 = FooterMenu.footerLinks5;
const link5 = menuLink5.map((links, index) => {
  return (
    <li key={"fLinks" + index}>
      <a href={links.url} rel="noreferrer">
        {links.title}
      </a>
    </li>
  );
});

const menuLinks = (
  <div sx={footerStyles.menuLinks} className="menuLinks">
    <div>
      <h3>{FooterMenu.title1}</h3>
      <ul>{link1}</ul>
    </div>
    <div>
      <h3>{FooterMenu.title2}</h3>
      <ul>{link2}</ul>
    </div>
    <div
      sx={{
        borderLeft: ["0px solid", "0px solid", "0px solid", "1px solid"],
        borderColor: ["none", "none", "none", "borderColor"],
        pl: [0, 0, 0, 4],
      }}
    >
      <h3>{FooterMenu.title3}</h3>
      <ul>{link3}</ul>
    </div>
    <div>
      <h3>{FooterMenu.title4}</h3>
      <ul>{link4}</ul>
    </div>
    <div>
      <h3>{FooterMenu.title5}</h3>
      <ul>{link5}</ul>
    </div>

    <div>
      <h3>Apps</h3>
      <div>
        <button sx={footerStyles.appBtn}>
          <RiAppleFill sx={footerStyles.appIcon} />
          <div sx={footerStyles.appData}>
            <Link to={FooterMenu.appLinks.appleLink}>
              Download on the <span>App Store</span>
            </Link>
          </div>
        </button>
        <button sx={footerStyles.appBtn}>
          <RiGooglePlayFill sx={footerStyles.appIcon} />
          <div sx={footerStyles.appData}>
            <Link to={FooterMenu.appLinks.androidLink}>
              Get it on <span>Google Play</span>
            </Link>
          </div>
        </button>
      </div>
      <SocialIcons />
    </div>
  </div>
);

const copyrightText = (
  <p sx={footerStyles.copyrightText}>
    {FooterData.copyrightText}
    <span sx={{ ml: 2 }}>
      <Link to={FooterData.copyrightTextLink} target="_blank">
        {FooterData.copyrightLinkText}
      </Link>
    </span>
  </p>
);

const Footer = () => {
  return (
    <footer>
      <div sx={{ maxWidth: "100%", bg: "footerBg" }}>
        <div sx={footerStyles.footerContainer}>{menuLinks}</div>
      </div>
      <div sx={{ maxWidth: "100%", bg: darken("footerBg", 0.01) }}>
        <div sx={footerStyles.footerSubContainer}>
          {copyrightText}
          <Theme />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
