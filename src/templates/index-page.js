/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, Link } from "gatsby";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import BlogListHome from "../components/blog-list-home";
import FeaturesHome from "../components/features-list-home";
import ServicesHome from "../components/services-list-home";
import Testimonials from "../components/testimonials";
import Customers from "../components/customers";
import Seo from "../components/seo";

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        description
        cta {
          text
          url
        }
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        customers {
          customersVisibility
          title
          description
          customerImages {
            customerName
            customerImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
              relativePath
              publicURL
            }
          }
        }
        testimonialsContainer {
          testimonialVisibility
          testimonials {
            description
            name
            jobRole
            testimonialImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
    features: allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "features-page" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            align
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            featureCta
            bulletedList {
              bulletedListShow
              list {
                text
              }
            }
            accordionList {
              accordionListShow
              list {
                description
                text
              }
            }
          }
        }
      }
    }

    services: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "services-page" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            description
            date
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
              relativePath
              publicURL
            }
          }
        }
      }
    }
  }
`;

const HomePage = ({ data }) => {
  const { markdownRemark, posts, services, features } = data; // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark;
  const hasImage = getSrc(frontmatter.featuredImage).includes("spacer.png")
    ? false
    : true;
  const homeImg = hasImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : "";

  const customerInfo = frontmatter.customers;
  const testimonials = frontmatter.testimonialsContainer.testimonials;
  return (
    <Layout>
      <Seo title={frontmatter.name} description={frontmatter.description} />
      <div sx={indexStyles.homeBanner}>
        <div sx={{ variant: "variants.container" }}>
          <div sx={indexStyles.featuredHome}>
            <div sx={indexStyles.homeData}>
              <h3 sx={indexStyles.title}>{frontmatter.name}</h3>
              <p sx={indexStyles.description}>{frontmatter.description}</p>
              <Link to={frontmatter.cta.url} sx={indexStyles.button}>
                {frontmatter.cta.text}
                <span>&rarr;</span>
              </Link>
            </div>
            <GatsbyImage
              image={homeImg}
              alt={frontmatter.name + " - Featured image"}
              sx={indexStyles.homeImg}
            />
          </div>
        </div>
      </div>
      <FeaturesHome data={features} />
      <ServicesHome data={services} />
      {frontmatter.testimonialsContainer.testimonialVisibility === "YES" ? (
        <Testimonials data={testimonials} />
      ) : (
        ""
      )}
      {frontmatter.customers.customersVisibility === "YES" ? (
        <Customers data={customerInfo} />
      ) : (
        ""
      )}
      <BlogListHome data={posts} />
    </Layout>
  );
};

export default HomePage;

const indexStyles = {
  homeBanner: {
    maxWidth: "100%",
    backgroundImage: (theme) =>
      `linear-gradient(to bottom, ${theme.colors.headerBg}, ${theme.colors.featuredBg})`,
    borderBottomLeftRadius: "20%",
    borderBottomRightRadius: "20%",
  },
  featuredHome: {
    variant: "variants.section",
    display: "grid",
    gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"],
    alignItems: "center",
    jutifyItems: "center",
    gap: "60px",
  },
  homeData: {
    mt: [4, 4, 0],
  },
  title: {
    color: "SecondaryColor",
    m: 0,
    p: 0,
    mb: 2,
    fontSize: [6, 6, 6, 6, 7],
    letterSpacing: "0.5px",
    fontWeight: "100 !important",
  },
  description: {
    color: "textColor",
    m: 0,
    fontSize: [3, 4],
    lineHeight: "1.3",
    fontWeight: "100",
    maxWidth: "45ch",
  },
  button: {
    variant: "variants.button",
  },
};
