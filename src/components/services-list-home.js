/** @jsx jsx */
import { jsx } from "theme-ui";
import ServiceCard from "../components/service-card";
import servicesData from "../util/services.json";

export default function BlogListHome(props) {
  const data = props.data;
  const services = data.edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => <ServiceCard key={edge.node.id} data={edge.node} />);
  return <PostMaker data={services} />;
}

const PostMaker = ({ data }) => (
  <section sx={servicesStyles.container}>
    <div sx={servicesStyles.servicesContainer}>
      <div sx={servicesStyles.servicesData}>
        <h2>{servicesData.title}</h2>
        <p>{servicesData.description}</p>
      </div>
      <div sx={servicesStyles.servicesList}>{data.slice(0, 6)}</div>
    </div>
  </section>
);

const servicesStyles = {
  container: {
    variant: "variants.container",
  },
  servicesContainer: {
    variant: "variants.section",
  },
  servicesList: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
  },
  servicesData: {
    variant: "variants.pageHead",
  },
};
