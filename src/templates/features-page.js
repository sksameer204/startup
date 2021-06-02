/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getSrc } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import slugify from "@sindresorhus/slugify";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const pageQuery = graphql`
  query FeaturesQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;

const featurePrefix = `/features/`;

const Pagination = (props) => (
  <div sx={featureStyles.postPagination}>
    <ul>
      {props.previous &&
        props.previous.frontmatter.template === "features-page" && (
          <li>
            <Link
              to={
                featurePrefix + slugify(`${props.previous.frontmatter.title}`)
              }
              rel="prev"
            >
              <p>
                <span className="icon">&larr;</span> Previous
              </p>
              <span className="page-title">
                {props.previous.frontmatter.title}
              </span>
            </Link>
          </li>
        )}
      {props.next && props.next.frontmatter.template === "features-page" && (
        <li>
          <Link
            to={featurePrefix + slugify(`${props.next.frontmatter.title}`)}
            rel="prev"
          >
            <p>
              Next <span className="icon">&rarr;</span>
            </p>
            <span className="page-title">{props.next.frontmatter.title}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
);

const Features = ({ data, pageContext }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const { previous, next } = pageContext;

  const hasImage = getSrc(frontmatter.featuredImage).includes("spacer.png")
    ? false
    : true;
  const FeaturesImage = hasImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : "";
  const featureImg = (
    <GatsbyImage
      image={FeaturesImage}
      alt={frontmatter.title + " - Featured image"}
    />
  );
  let props = {
    previous,
    next,
  };
  const featureSlug = slugify(`${frontmatter.title}`);
  const Breadcrumb = () => (
    <div
      sx={{
        variant: "variants.breadcrumb",
      }}
    >
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        sx={featureStyles.containerOl}
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link itemProp="item" to="/features">
            <span itemProp="name">Features</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <span sx={{ color: "textColor" }}>›</span>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            itemScope
            itemType="https://schema.org/WebPage"
            itemProp="item"
            itemID={"/features/" + featureSlug}
            to={"/features/" + featureSlug}
          >
            <span itemProp="name">{frontmatter.title}</span>
          </Link>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </div>
  );
  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        article={true}
      />
      <div sx={featureStyles.featurePageContainer}>
        <article sx={featureStyles.featureContainer}>
          <div>
            <header>
              {frontmatter.title ? (
                <section sx={{ variant: "variants.pageHead" }}>
                  {frontmatter.title ? <h2>{frontmatter.title}</h2> : ""}
                  {frontmatter.description ? (
                    <p>{frontmatter.description}</p>
                  ) : (
                    ""
                  )}
                </section>
              ) : (
                ""
              )}
              <div sx={featureStyles.featureImage}>{featureImg}</div>
            </header>
          </div>
          <div
            sx={featureStyles.potfolioBody}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {(previous || next) && <Pagination {...props} />}
        </article>
        <Breadcrumb />
      </div>
    </Layout>
  );
};

export default Features;

const featureStyles = {
  featurePageContainer: {
    variant: "variants.section",
  },
  featureContainer: {
    variant: "variants.container",
    minHeight: "70vh",
    color: "textColor",
  },
  potfolioBody: {
    variant: "variants.markdown",
    maxWidth: "75ch",
    m: "0 auto",
    mb: 7,
    p: {
      fontSize: [3, 3, 3, 4],
    },
  },
  featureDate: {
    pt: 3,
    display: ["block", "block", "flex"],
    alignItems: "center",
    color: "mutedColor",
    justifyContent: "center",
  },
  featureImage: {
    maxWidth: "100%",
    mb: 6,
    overflow: "hidden",
    borderRadius: "12px",
    ".gatsby-image-wrapper": {
      maxWidth: "100% !important",
      maxHeight: "100% !important",
      width: "100%",
    },
  },
  postPagination: {
    variant: "variants.pagination",
  },
};
