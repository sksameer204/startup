/** @jsx jsx */
import { jsx } from "theme-ui";
import Seo from "../components/seo";
import { Link } from "gatsby";
import Layout from "../components/layout";
import { darken } from "@theme-ui/color";

const Signin = () => {
  return (
    <Layout>
      <Seo title="Sign in" />
      <div sx={signinStyles.signinContainer}>
        <div sx={signinStyles.wrapper}>
          <form
            sx={signinStyles.contactForm}
            action="/"
            name="signin"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <h2 sx={{ mt: 0, color: "primaryColor" }}>Sign In</h2>
            <p>
              <input type="email" name="email" placeholder="Email" required />
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </p>
            <Link to="/forgotpassword" sx={signinStyles.forgetBtn}>
              Forgot Password
            </Link>
            <button sx={signinStyles.signIn} type="submit">
              Log In
            </button>
          </form>
          <Link sx={signinStyles.signUp} to="/signup">
            Don't have an account? <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;

const signinStyles = {
  signinContainer: {
    variant: "variants.container",
    minHeight: "60vh",
    // maxWidth: "100%",
    // backgroundImage: (theme) =>
    //   `linear-gradient(to bottom, ${theme.colors.headerBg}, ${theme.colors.featuredBg})`,
    //   borderBottomLeftRadius: "20%",
    //   borderBottomRightRadius: "20%",
  },
  wrapper: {
    variant: "variants.section",
    maxWidth: "400px",
    m: "0 auto",
  },
  contactForm: {
    borderBottom: "1px solid",
    borderColor: "borderColor",
    mb: 5,
    p: {
      m: 0,
    },
    input: {
      width: "100%",
      maxWidth: "100%",
      mb: 4,
      p: "12px",
      bg: "transparent",
      color: "titleColor",
      border: "1px solid",
      borderColor: "borderColor",
      borderRadius: "10px",
      appearance: "none",
      fontSize: "16px",
      outline: "none",
      "&:focus ": {
        borderColor: darken("borderColor", 0.1),
      },
    },
  },
  signIn: {
    variant: "variants.button",
    fontFamily: "inherit",
    my: 5,
  },
  forgetBtn: {
    display: "block",
    color: "SecondaryColor",
  },
  signUp: {
    color: "primaryColor",
    span: {
      color: "SecondaryColor",
      fontWeight: "600",
      "&:hover": {
        color: "primaryColor",
      },
    },
  },
};
