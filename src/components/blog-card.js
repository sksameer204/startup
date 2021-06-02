/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import slugify from "@sindresorhus/slugify";
import { darken } from "@theme-ui/color";

const postPrefix = `/blog/`;
const BlogCard = ({ data }) => (
  <article sx={blogStyles.postCard}>
    <Link to={postPrefix + slugify(`${data.frontmatter.title}`)}>
      {data.frontmatter.featuredImage ? (
        <div sx={blogStyles.postImage}>
          <GatsbyImage
            image={
              data.frontmatter.featuredImage.childImageSharp.gatsbyImageData
            }
            alt={data.frontmatter.title + " - Featured image"}
            sx={blogStyles.featuredImage}
          />
        </div>
      ) : (
        ""
      )}
      {data.frontmatter.title ? (
        <div sx={blogStyles.postContent}>
          <h3 sx={blogStyles.title}>{data.frontmatter.title}</h3>
          <div sx={blogStyles.date}>
            <p>{data.frontmatter.date}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </Link>
  </article>
);
export default BlogCard;

const blogStyles = {
  featuredImage: {
    maxWidth: "100% !important",
    width: "100% !important",
    height: "250px",
    borderRadius: "6px",
    ".gatsby-image-wrapper [data-main-image]": {
      transform: "inherit",
    },
  },
  title: {
    mt: 3,
    mb: 0,
    fontWeight: "200 !important",
    fontSize: 4,
    color: "titleColor",
    "&:hover": {
      color: "titleHoverColor",
    },
    maxWidth: "30ch",
  },
  date: {
    display: "block",
    mt: 2,
    color: darken("titleColor", 0.05),
  },
};
