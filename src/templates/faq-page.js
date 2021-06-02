/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Accordion from "../components/faq-accordion";

export const pageQuery = graphql`
  query FaqQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      frontmatter {
        faq {
          Description
          title
        }
        description
        title
      }
    }
  }
`;

const FaqPage = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark;

  //Pricing Data
  const faqData = frontmatter.faq.map((faq, index) => {
    return (
      <Accordion
        key={"faq" + index}
        name={faq.title}
        content={faq.Description}
        sx={faqStyles.accordion}
      />
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
          <div sx={faqStyles.faqData}>
            <h2>{frontmatter.title}</h2>
            <p>{frontmatter.description}</p>
          </div>
          {faqData}
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;

const faqStyles = {
  faqData: {
    variant: "variants.pageHead",
  },
};
