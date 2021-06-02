/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { RiCheckboxCircleLine } from "react-icons/ri";

import Seo from "../components/seo";
import Layout from "../components/layout";

const Thanks = () => (
  <Layout sx={thanksStyles.thanksPage}>
    <Seo title="Thank you" />
    <div sx={thanksStyles.wrapper}>
      <h1>
        Got y<RiCheckboxCircleLine />
        ur message
      </h1>
      <p>Thank you for getting in touch us. We will get back to you shortly.</p>
      <Link to="/" sx={thanksStyles.button}>
        Lets go back to Homepage
      </Link>
    </div>
  </Layout>
);

export default Thanks;

const thanksStyles = {
  thanksPage: {
    pt: "130px",
    minHeight: "80vh",
  },
  wrapper: {
    variant: "variants.container",
    maxWidth: "100%",
    backgroundImage: (theme) =>
      `linear-gradient(to bottom, ${theme.colors.headerBg}, ${theme.colors.featuredBg})`,
    textAlign: "center",
    pb: 7,
    borderBottomLeftRadius: "20%",
    borderBottomRightRadius: "20%",
    h1: {
      color: "titleColor",
      m: 0,
      mb: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    p: {
      color: "textColor",
      fontSize: 4,
      maxWidth: "50ch",
      m: "0 auto",
    },
  },
  button: {
    variant: "variants.button",
  },
};
