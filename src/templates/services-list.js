/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql, Link } from "gatsby";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";

import Layout from "../components/layout";
import ServiceCard from "../components/service-card";
import Seo from "../components/seo";
import servicesData from "../util/services.json";

export const servicesListQuery = graphql`
  query servicesListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "services-page" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
            description
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
const Pagination = (props) => (
  <div sx={servicesStyles.listPagination}>
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            <span className="icon -left">
              <RiArrowLeftLine />
            </span>{" "}
            Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numberPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link
            to={`${props.serviceSlug}${i === 0 ? "" : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next{" "}
            <span className="icon -right">
              <RiArrowRightLine />
            </span>
          </Link>
        </li>
      )}
    </ul>
  </div>
);

class ServicesIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { currentPage, numberPages } = this.props.pageContext;
    const serviceSlug = "/services/";
    const isFirst = currentPage === 1;
    const isLast = currentPage === numberPages;
    const prevPage =
      currentPage - 1 === 1
        ? serviceSlug
        : serviceSlug + (currentPage - 1).toString();
    const nextPage = serviceSlug + (currentPage + 1).toString();

    const Services = data.allMarkdownRemark.edges
      .filter((edge) => !!edge.node.frontmatter.date)
      .map((edge) => <ServiceCard key={edge.node.id} data={edge.node} />);

    let props = {
      isFirst,
      prevPage,
      numberPages,
      serviceSlug,
      currentPage,
      isLast,
      nextPage,
    };

    return (
      <Layout sx={servicesStyles.servicesContainer}>
        <Seo
          title={"Services — Page " + currentPage + " of " + numberPages}
          description={"Services page " + currentPage + " of " + numberPages}
        />
        <div sx={servicesStyles.servicesListContainer}>
          <div sx={servicesStyles.pageHead}>
            <h2>{servicesData.title}</h2>
            <p>{servicesData.description}</p>
          </div>
          <div sx={servicesStyles.servicesList}>{Services}</div>
        </div>
        {numberPages > 1 && <Pagination {...props} />}
      </Layout>
    );
  }
}

export default ServicesIndex;

const servicesStyles = {
  servicesContainer: {
    variant: "variants.section",
    minHeight: "80vh",
  },
  servicesListContainer: {
    variant: "variants.container",
  },
  pageHead: {
    variant: "variants.pageHead",
  },
  servicesList: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
    mb: 7,
  },
  listPagination: {
    variant: "variants.pageListPagination",
  },
};
