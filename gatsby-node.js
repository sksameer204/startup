const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const slugify = require("@sindresorhus/slugify");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const servicesList = path.resolve(`./src/templates/services-list.js`);
  const blogList = path.resolve(`./src/templates/blog-list.js`);
  const portfolioList = path.resolve(`./src/templates/features-list.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
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
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Index page
  const homepage = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "index-page");

  homepage.forEach((home) => {
    const id = home.node.id;
    createPage({
      path: home.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(home.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });

  // About page
  const aboutpage = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "about-page");

  aboutpage.forEach((about) => {
    const id = about.node.id;
    createPage({
      path: about.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(about.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });

  // Pricing page
  const pricepage = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "price-page");

  pricepage.forEach((price) => {
    const id = price.node.id;
    createPage({
      path: price.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(price.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });

  // Faq page
  const faqpage = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "faq-page");

  faqpage.forEach((faq) => {
    const id = faq.node.id;
    createPage({
      path: faq.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(faq.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });

  // Contact page
  const contactpage = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "contact-page");

  contactpage.forEach((contact) => {
    const id = contact.node.id;
    createPage({
      path: contact.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(contact.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });
  // Blogs
  // Create markdown pages
  let blogPostsCount = 0;
  const posts = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "blog-post");

  posts.forEach((post, index) => {
    const id = post.node.id;
    const postTitle = post.node.frontmatter.title;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const prefix = `/blog/`;
    const slug = slugify(postTitle);

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    });
    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++;
    }
  });
  // Create blog-list pages
  const postsPerPage = 9;
  const numPages = Math.ceil(blogPostsCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Features
  // Create markdown pages
  let portfolioPageCount = 0;
  const portfolios = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "features-page");

  portfolios.forEach((features, index) => {
    const id = features.node.id;
    const portfolioTitle = features.node.frontmatter.title;
    const previous =
      index === portfolios.length - 1 ? null : portfolios[index + 1].node;
    const next = index === 0 ? null : portfolios[index - 1].node;
    const prefix = `/features/`;
    const slug = slugify(portfolioTitle);

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(features.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    });
    // Count features posts.
    if (features.node.frontmatter.template === "features-page") {
      portfolioPageCount++;
    }
  });
  // Create features-list pages
  const portfolioPerPage = 7;
  const numbersPages = Math.ceil(portfolioPageCount / portfolioPerPage);

  Array.from({ length: numbersPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/features` : `/features/${i + 1}`,
      component: portfolioList,
      context: {
        limit: portfolioPerPage,
        skip: i * portfolioPerPage,
        numbersPages,
        currentPage: i + 1,
      },
    });
  });

  //  services
  // Create markdown pages
  let servicePageCount = 0;
  const services = result.data.allMarkdownRemark.edges
    // .filter((edge) => edge.node.frontmatter.template.length > 0)
    .filter((product) => product.node.frontmatter.template == "services-page");

  services.forEach((service, index) => {
    const id = service.node.id;
    const servicesTitle = service.node.frontmatter.title;
    const previous =
      index === services.length - 1 ? null : services[index + 1].node;
    const next = index === 0 ? null : services[index - 1].node;
    const prefix = `/services/`;
    const slug = slugify(servicesTitle);

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(service.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        servicesTitle,
        previous,
        next,
      },
    });
    // Count services posts.
    if (service.node.frontmatter.template === "services-page") {
      servicePageCount++;
    }
  });
  // Create services-list pages
  const servicesPerPage = 9;
  const numberPages = Math.ceil(servicePageCount / servicesPerPage);
  Array.from({ length: numberPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/services` : `/services/${i + 1}`,
      component: servicesList,
      context: {
        limit: servicesPerPage,
        skip: i * servicesPerPage,
        numberPages,
        currentPage: i + 1,
      },
    });
  });

  // Tags
  // Create markdown pages
  let tagPageCount = 0;
  const tags = result.data.allMarkdownRemark.edges.filter(
    (product) => product.node.frontmatter.template == "tags-page"
  );

  tags.forEach((tag, index) => {
    const id = tag.node.id;
    const tagTitle = tag.node.frontmatter.title;
    const previous = index === tags.length - 1 ? null : tags[index + 1].node;
    const next = index === 0 ? null : tags[index - 1].node;
    const prefix = `/tag/`;
    const slug = slugify(tagTitle);

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(tag.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        tagTitle,
        previous,
        next,
      },
    });
    // Count tag posts.
    if (tag.node.frontmatter.template === "tags-page") {
      tagPageCount++;
    }
  });

  // Categories
  // Create markdown pages
  let categoryPageCount = 0;
  const categories = result.data.allMarkdownRemark.edges
    // .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(
      (product) => product.node.frontmatter.template == "categories-page"
    );

  categories.forEach((category, index) => {
    const id = category.node.id;
    const categoryTitle = category.node.frontmatter.title;
    const previous =
      index === categories.length - 1 ? null : categories[index + 1].node;
    const next = index === 0 ? null : categories[index - 1].node;
    const prefix = `/category/`;
    const slug = slugify(categoryTitle);

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(category.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        categoryTitle,
        previous,
        next,
      },
    });
    // Count category posts.
    if (category.node.frontmatter.template === "categories-page") {
      categoryPageCount++;
    }
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
