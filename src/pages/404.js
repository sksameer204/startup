/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { SiZeromq } from "react-icons/si";

import Seo from "../components/seo";
import Layout from "../components/layout";

const NotFound = () => (
  <Layout sx={errorStyles.notFoundPage}>
    <Seo title="Page not found" />
    <div sx={errorStyles.wrapper}>
      <header>
        <h1>
          Oops page n<SiZeromq sx={errorStyles.icon} />t found
        </h1>
        <p>
          Have you wondered into the unknow. Let us help you, Please take a look
          at below options
        </p>
      </header>
      <Link to="/" sx={errorStyles.button}>
        Back to Homepage
      </Link>
      <Link to="/contact" sx={errorStyles.button2}>
        Report this <span>&rarr;</span>
      </Link>
    </div>
  </Layout>
);

export default NotFound;

const errorStyles = {
  notFoundPage: {
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
  button2: {
    ml: 5,
    color: "titleColor",
    fontSize: 3,
    "&:hover": {
      color: "SecondaryColor",
    },
  },
};
