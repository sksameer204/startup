/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import FeaturesCard from "./features-card";

export default function FeaturesListHome(props) {
  const data = props.data;
  const features = data.edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <FeaturesCard key={edge.node.id} data={edge.node} />);
  return <PostMaker data={features} />;
}

const PostMaker = ({ data }) => (
  <div sx={featureStyles.featureContainer}>
    <section sx={featureStyles.features}>
      {data.slice(0, 3)}
      {data.length > 3 ? (
        <Link sx={{ variant: "variants.moreButton" }} to="/features">
          See all projects
          <span>&rarr;</span>
        </Link>
      ) : (
        ""
      )}
    </section>
  </div>
);

const featureStyles = {
  featureContainer: {
    variant: "variants.section",
    pb: 0,
  },
  features: {
    variant: "variants.container",
  },
};
