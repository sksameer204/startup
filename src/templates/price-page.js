/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

import { darken, lighten } from "@theme-ui/color";

export const pageQuery = graphql`
  query PriceQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      frontmatter {
        title
        description
        pricing {
          title
          price
          supportText
          features {
            text
          }
          button {
            text
            url
          }
          description
          popular
        }
      }
    }
  }
`;

const PricePage = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark;

  //Pricing Data
  const pricingData = frontmatter.pricing.map((price, index) => {
    return (
      <div key={"price" + index}>
        {price.popular === false ? (
          <div sx={priceStyles.box}>
            <h5 sx={priceStyles.title}>{price.title}</h5>
            <div sx={priceStyles.priceInfo}>
              <h2>{price.price}</h2>
              <span>{price.supportText}</span>
            </div>
            {price.features.map((info) => {
              return <p sx={priceStyles.feature}>{info.text}</p>;
            })}
            {price.button.text === "" ? (
              ""
            ) : (
              <Link to={price.button.url} sx={priceStyles.button}>
                {price.button.text}
                <span>&rarr;</span>
              </Link>
            )}
            <p sx={priceStyles.description}>{price.description}</p>
          </div>
        ) : (
          <div sx={priceStyles.box2}>
            <h5 sx={priceStyles.title}>{price.title}</h5>
            <div sx={priceStyles.priceInfo}>
              <h2>{price.price}</h2>
              <span>{price.supportText}</span>
            </div>
            {price.features.map((info) => {
              return <p sx={priceStyles.feature}>{info.text}</p>;
            })}
            {price.button.text === "" ? (
              ""
            ) : (
              <Link to={price.button.url} sx={priceStyles.button}>
                {price.button.text}
                <span>&rarr;</span>
              </Link>
            )}
            <p sx={priceStyles.description}>{price.description}</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.aboutDescription}
      />
      <div sx={{ variant: "variants.container" }}>
        <div sx={{ variant: "variants.section", minHeight: "90ch" }}>
          <div sx={priceStyles.priceData}>
            <h2>{frontmatter.title}</h2>
            <p>{frontmatter.description}</p>
          </div>
          <div sx={priceStyles.priceBoxes}>{pricingData}</div>
        </div>
      </div>
    </Layout>
  );
};

export default PricePage;

const priceStyles = {
  priceData: {
    variant: "variants.pageHead",
  },
  priceBoxes: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
    gap: "30px",
  },
  box: {
    border: "2px solid",
    borderColor: "borderColor",
    borderRadius: "6px",
    p: 4,
    textAlign: "center",
    "&:hover": {
      borderColor: "SecondaryColor",
    },
  },
  box2: {
    border: "2px solid",
    borderColor: "SecondaryColor",
    borderRadius: "6px",
    p: 4,
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: "'Popular'",
      position: "absolute",
      top: 0,
      right: 0,
      bg: "SecondaryColor",
      py: 1,
      px: 3,
      borderRadius: "6px",
      borderTopRightRadius: "3px",
      color: lighten("textColor", 1),
      "&:hover": {
        borderColor: darken("borderColor", 0.07),
      },
    },
  },
  title: {
    color: "SecondaryColor",
    m: 0,
    p: 0,
    mb: 2,
    fontSize: 4,
    fontWeight: "100 !important",
  },
  priceInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: 3,
    h2: {
      m: 0,
      color: "primaryColor",
    },
    span: {
      ml: 3,
      color: "textColor",
    },
  },
  button: {
    variant: "variants.button",
  },
  description: {
    mt: 4,
    color: "textColor",
  },
  feature: {
    fontSize: "18px",
    fontWeight: "500",
    color: "titleColor",
    mt: 0,
    mb: 1,
  },
};
