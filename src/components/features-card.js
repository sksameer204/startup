/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import slugify from "@sindresorhus/slugify";
import Accordion from "./faq-accordion";

const features = `/features/`;
const FeaturesCard = ({ data }) => {
  // Bullte list
  const bulletedList = data.frontmatter.bulletedList;
  const Blist = bulletedList.list.map((list, index) => {
    return (
      <div key={"bullet List" + index}>
        <p sx={featureStyles.bulletedList}>{list.text}</p>
      </div>
    );
  });

  // Accordion list
  const accordionList = data.frontmatter.accordionList;
  const Alist = accordionList.list.map((accordion, index) => {
    return (
      <div key={"bullet List" + index} sx={featureStyles.accordion}>
        <Accordion name={accordion.text} content={accordion.description} />
      </div>
    );
  });

  // Features Image
  const hasImage = getSrc(data.frontmatter.featuredImage).includes("spacer.png")
    ? false
    : true;
  const FeaturesImage = hasImage
    ? data.frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : "";
  const potfolioImg = (
    <Link to={features + slugify(`${data.frontmatter.title}`)}>
      <GatsbyImage
        image={FeaturesImage}
        alt={data.frontmatter.title + " - Featured image"}
        sx={featureStyles.featuredImage}
      />
    </Link>
  );

  // Features Data
  const FeaturesInfo = (
    <div sx={featureStyles.FeaturesInfo}>
      {data.frontmatter.title ? (
        <h3 sx={featureStyles.featureTitle}>
          <Link to={features + slugify(`${data.frontmatter.title}`)}>
            {data.frontmatter.title}
          </Link>
        </h3>
      ) : (
        ""
      )}
      <p sx={featureStyles.featureDecription}>{data.frontmatter.description}</p>
      {bulletedList.bulletedListShow === true ? Blist : ""}
      {accordionList.accordionListShow === true ? Alist : ""}
      <Link
        to={features + slugify(`${data.frontmatter.title}`)}
        sx={{ variant: "variants.moreButton", mt: 6 }}
      >
        {data.frontmatter.featureCta}
        <span>&rarr;</span>
      </Link>
    </div>
  );

  return (
    <div>
      {data.frontmatter.align === "left" ? (
        <article sx={featureStyles.featureContainer}>
          {potfolioImg}
          {FeaturesInfo}
        </article>
      ) : (
        ""
      )}

      {data.frontmatter.align === "right" ? (
        <article sx={featureStyles.featureContainer}>
          <div sx={featureStyles.orderOne}>{FeaturesInfo}</div>
          <div sx={featureStyles.orderTwo}>{potfolioImg}</div>
        </article>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeaturesCard;

const featureStyles = {
  featureContainer: {
    maxWidth: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "1fr  1fr"],
    justifyContent: "center",
    mb: 6,
    gap: "60px",
  },
  orderOne: {
    order: ["2", "2", "1"],
  },
  orderTwo: {
    order: ["1", "1", "2"],
  },
  FeaturesInfo: {
    maxWidth: "75ch",
    pt: [0, 0, 5, 6],
  },
  featuredImage: {
    maxWidth: "100%",
    width: "100%",
    height: "600px",
    display: "block",
    borderRadius: "6px",
  },
  featureTitle: {
    mt: 0,
    mb: 2,
    a: {
      fontWeight: "300",
      fontSize: [5, 6],
      color: "titleColor",
      "&:hover": {
        color: "titleHoverColor",
      },
    },
  },
  featureDecription: {
    m: 0,
    maxWidth: "75ch",
    fontSize: 3,
    color: "textColor",
    mb: 5,
  },
  bulletedList: {
    display: "block",
    fontWeight: "300",
    fontSize: 3,
    color: "textColor",
    m: 3,
    "&::before": {
      content: "'✓'",
      p: "2px",
      mr: 2,
      fontSize: 1,
      color: "SecondaryColor",
      border: "2px solid",
      borderColor: "SecondaryColor",
      borderRadius: "50%",
      borderTopRightRadius: "30%",
    },
  },
  accordion: {
    ".accordionField": {
      borderBottom: "none",
      mb: 3,
    },
  },
};
