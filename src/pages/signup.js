/** @jsx jsx */
import { jsx } from "theme-ui";
import Seo from "../components/seo";
import Layout from "../components/layout";
import { darken } from "@theme-ui/color";

const Signup = () => {
  return (
    <Layout>
      <Seo title="Sign in" />
      <div sx={signinStyles.signinContainer}>
        <div sx={signinStyles.wrapper}>
          <form
            sx={signinStyles.contactForm}
            action="/"
            name="signup"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <h2 sx={{ mt: 0, color: "primaryColor" }}>Sign Up</h2>
            <p>
              <input type="name" name="name" placeholder="Name" required />
            </p>
            <p>
              <input type="email" name="email" placeholder="Email" required />
            </p>
            <button
              sx={{ variant: "variants.button", mt: 0, fontFamily: "inherit" }}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

const signinStyles = {
  signinContainer: {
    variant: "variants.container",
    minHeight: "60vh",
  },
  wrapper: {
    variant: "variants.section",
  },
  contactForm: {
    maxWidth: "400px",
    m: "0 auto",
    p: {
      m: 0,
    },
    input: {
      width: "100%",
      maxWidth: "100%",
      mb: 5,
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
};
