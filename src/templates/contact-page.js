/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { darken } from "@theme-ui/color";

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        map
        mapVisibility
        Iso {
          text
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Contact = ({ data }) => {
  const { markdownRemark, site } = data; // data.markdownRemark holds your page data
  const { frontmatter, html } = markdownRemark;
  const options = frontmatter.Iso.map((option) => {
    return <option>{option.text}</option>;
  });

  const contactForm = (
    <div sx={contactStyles.wrapper}>
      <form
        sx={contactStyles.contactForm}
        action="/thanks"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <select>
          <option value="" disabled selected>
            Select your option
          </option>
          {options}
        </select>
        <div sx={contactStyles.wrap}>
          <textarea name="message" placeholder="Message" required></textarea>
          <div sx={contactStyles.sendButton}>
            <button sx={contactStyles.button} type="submit">
              Send message
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const contactInformation = (
    <div sx={{ variant: "variants.pageHead" }}>
      <h2 sx={contactStyles.title}>{frontmatter.title}</h2>
      <p
        sx={contactStyles.description}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );

  const map = frontmatter.map ? frontmatter.map : "";
  return (
    <Layout sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div sx={contactStyles.contactBody}>
        {contactInformation}
        {contactForm}
        {frontmatter.mapVisibility === "YES" ? (
          <div
            sx={contactStyles.map}
            dangerouslySetInnerHTML={{ __html: map }}
          />
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default Contact;

const contactStyles = {
  contactPage: {
    variant: "variants.section",
    pb: 0,
    minHeight: "80vh",
  },
  contactBody: {
    variant: "variants.container",
  },
  wrapper: {
    maxWidth: "745px",
    m: "0 auto",
  },
  contactForm: {
    input: {
      width: "100%",
      maxWidth: "100%",
      mb: 5,
      p: "16px",
      color: "titleColor",
      bg: "transparent",
      fontFamily: "inherit",
      border: "2px solid",
      borderColor: "borderColor",
      borderRadius: "10px",
      appearance: "none",
      fontSize: "16px",
      outline: "none",
      "&:focus ": {
        borderColor: darken("borderColor", 0.1),
      },
    },
    select: {
      width: "100%",
      maxWidth: "100%",
      fontFamily: "inherit",
      color: "titleColor",
      mb: 5,
      py: 3,
      px: 2,
      borderRadius: "10px",
      bg: "transparent",
      border: "2px solid",
      borderColor: "borderColor",
      fontSize: "16px",
      outline: "none",
      "&:focus ": {
        borderColor: darken("borderColor", 0.1),
      },
    },
    textarea: {
      minHeight: "200px",
      fontFamily: "inherit",
      width: "100%",
      maxWidth: "100%",
      p: "16px",
      bg: "transparent",
      color: "titleColor",
      border: "2px solid",
      borderColor: "borderColor",
      borderRadius: "10px",
      appearance: "none",
      fontSize: "16px",
      outline: "none",
      display: "block",
      "&:focus ": {
        borderColor: darken("borderColor", 0.1),
      },
    },
  },
  map: {
    maxWidth: "100%",
    m: "0 auto",
    my: 7,
    borderColor: "borderColor",
    iframe: {
      border: "1px solid",
      borderRadius: "12px",
      overflow: "hidden",
    },
  },
  button: {
    variant: "variants.button",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  wrap: {
    position: "relative",
    textarea: {
      mb: 0,
    },
  },
};
