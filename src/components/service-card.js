/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import slugify from "@sindresorhus/slugify";

const servicePrefix = `/services/`;
const ServiceCard = ({ data }) => {
  const hasImage = getSrc(data.frontmatter.image) ? true : false;
  const serviceImage =
    hasImage === true
      ? data.frontmatter.image.childImageSharp.gatsbyImageData
      : "";
  return (
    <Link
      to={servicePrefix + slugify(`${data.frontmatter.title}`)}
      sx={{ display: "contents" }}
    >
      <article sx={servicesStyles.serviceCard}>
        <div sx={servicesStyles.serviceContent}>
          {serviceImage !== "" ? (
            <GatsbyImage
              image={serviceImage}
              alt={data.frontmatter.title + " - image"}
            />
          ) : (
            <div
              sx={servicesStyles.logo}
              style={{
                mask:
                  "url('" +
                  data.frontmatter.image.publicURL +
                  "') no-repeat center / contain",
                WebkitMask:
                  "url('" +
                  data.frontmatter.image.publicURL +
                  "') no-repeat center / contain",
              }}
            />
          )}
          {data.frontmatter.title ? (
            <h3 sx={servicesStyles.serviceTitle}>{data.frontmatter.title}</h3>
          ) : (
            ""
          )}
          {data.frontmatter.description ? (
            <p sx={servicesStyles.serviceDescription}>
              {data.frontmatter.description}
            </p>
          ) : (
            ""
          )}
        </div>
      </article>
    </Link>
  );
};
export default ServiceCard;

const servicesStyles = {
  serviceTitle: {
    fontSize: [4],
    mb: 2,
    color: "titleColor",
    "&:hover": {
      color: "titleHoverColor",
    },
    cursor: "pointer",
  },
  serviceDescription: {
    fontSize: 3,
    color: "textColor",
    mb: 0,
    mt: 0,
  },
  serviceCard: {
    p: [4, 5],
    border: "1px solid",
    borderColor: "borderColor",
    textAlign: "center",
  },
  logo: {
    opacity: "0.5",
    width: "150px",
    height: "60px",
    bg: "SecondaryColor",
    m: "0 auto",
  },
};
