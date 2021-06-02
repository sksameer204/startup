/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import BlogCard from "./blog-card";
import blogData from "../util/blog.json";

export default function BlogListHome(props) {
  const data = props.data;
  const posts = data.edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <BlogCard key={edge.node.id} data={edge.node} />);
  return <PostMaker data={posts} />;
}

const PostMaker = ({ data }) => (
  <div sx={blogStyles.blogListHome}>
    <section sx={blogStyles.blogContainer}>
      <div
        sx={{
          mb: 6,
          display: ["block", "block", "flex"],
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span sx={blogStyles.title}>
            <strong>—</strong> {blogData.blogTitle}
          </span>
          <h3 sx={blogStyles.description}>{blogData.description}</h3>
        </div>
        {data.length > 4 ? (
          <Link to="/blog" sx={{ variant: "variants.moreButton" }}>
            See all Posts
            <span>&rarr;</span>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div sx={blogStyles.blogPosts}>{data.slice(0, 4)}</div>
    </section>
  </div>
);

const blogStyles = {
  blogListHome: {
    maxWidth: "100%",
    variant: "variants.section",
  },
  blogContainer: {
    variant: "variants.container",
  },
  title: {
    fontWeight: "300 !important",
    textTransform: "uppercase",
    color: "SecondaryColor",
    mt: 0,
    mb: 3,
    display: "block",
    fontSize: 2,
    letterSpacing: "0.5px",
    strong: {
      fontWeight: "900",
    },
  },
  description: {
    color: "primaryColor",
    fontSize: 5,
    m: 0,
    fontWeight: "initial !important",
    maxWidth: "40ch",
  },
  blogPosts: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(4, 1fr)",
    ],
    gap: "30px",
  },
};
