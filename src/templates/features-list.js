/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import FeaturesCard from "../components/features-card";
import Seo from "../components/seo";
import featureData from "../util/features.json";

export const featureListQuery = graphql`
  query featureListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "features-page" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
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
  }
`;
const Pagination = (props) => (
  <div sx={featureStyles.listPagination}>
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            <span class="icon">&rarr;</span> Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numbersPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link
            to={`${props.featureSlug}${i === 0 ? "" : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next <span class="icon">&rarr;</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
);

class FeaturesIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { currentPage, numbersPages } = this.props.pageContext;
    const featureSlug = "/features/";
    const isFirst = currentPage === 1;
    const isLast = currentPage === numbersPages;
    const prevPage =
      currentPage - 1 === 1
        ? featureSlug
        : featureSlug + (currentPage - 1).toString();
    const nextPage = featureSlug + (currentPage + 1).toString();

    const Features = data.allMarkdownRemark.edges
      .filter((edge) => !!edge.node.frontmatter.date)
      .map((edge) => <FeaturesCard key={edge.node.id} data={edge.node} />);
    let props = {
      isFirst,
      prevPage,
      numbersPages,
      featureSlug,
      currentPage,
      isLast,
      nextPage,
    };

    return (
      <Layout sx={featureStyles.featureContainer}>
        <Seo
          title={"Features — Page " + currentPage + " of " + numbersPages}
          description={"Features page " + currentPage + " of " + numbersPages}
        />
        <div sx={featureStyles.featureListContainer}>
          <div sx={featureStyles.pageHead}>
            <h2>{featureData.title}</h2>
            <p>{featureData.description}</p>
          </div>
          {Features}
        </div>
        {numbersPages > 1 && <Pagination {...props} />}
      </Layout>
    );
  }
}

export default FeaturesIndex;

const featureStyles = {
  featureContainer: {
    variant: "variants.section",
    minHeight: "70vh",
  },
  featureListContainer: {
    variant: "variants.container",
  },
  pageHead: {
    variant: "variants.pageHead",
  },
  listPagination: {
    variant: "variants.pageListPagination",
  },
};
