/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";
import slugify from "@sindresorhus/slugify";

import Layout from "../components/layout";
import Seo from "../components/seo";

export const pageQuery = graphql`
  query ServicesQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        title
        description
      }
    }
  }
`;

const Post = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const servicesSlug = slugify(`${frontmatter.title}`);
  const Breadcrumb = () => (
    <div sx={servicesStyles.breadcrumbList}>
      <ol
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
        sx={servicesStyles.containerOl}
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link itemprop="item" to="/services">
            <span itemprop="name">Services</span>
          </Link>
          <meta itemprop="position" content="1" />
        </li>
        <span sx={{ color: "global.textColor" }}>›</span>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link
            itemscope
            itemtype="https://schema.org/WebPage"
            itemprop="item"
            itemid={"/features/" + servicesSlug}
            to={"/services/" + servicesSlug}
          >
            <span itemprop="name">{frontmatter.title}</span>
          </Link>
          <meta itemprop="position" content="2" />
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
      <div sx={servicesStyles.servicesPageContainer}>
        <section sx={servicesStyles.servicesDiv}>
          <div sx={{ variant: "variants.pageHead" }}>
            <h2>{frontmatter.title}</h2>
            <p>{frontmatter.description}</p>
          </div>
          <div
            sx={servicesStyles.servicesBody}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </div>
      <Breadcrumb />
    </Layout>
  );
};

export default Post;

const servicesStyles = {
  servicesPageContainer: {
    variant: "variants.section",
    minHeight: "75vh",
  },
  servicesDiv: {
    variant: "variants.container",
  },
  servicesBody: {
    variant: "variants.markdown",
    m: "0 auto",
    maxWidth: "75ch",
  },
  breadcrumbList: {
    variant: "variants.breadcrumb",
  },
};
