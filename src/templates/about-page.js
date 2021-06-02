/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ReactMarkdown from "react-markdown";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import { darken } from "@theme-ui/color";

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      frontmatter {
        title
        aboutDescription
        aboutImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        timelineContainer {
          hideTimeline
          timelineText
          timeline {
            title
            tagline
            working
            startDate(formatString: "MMMM YYYY")
            endDate(formatString: "MMMM YYYY")
            description
          }
        }
        teamContainer {
          hideTeam
          teamText
          teams {
            tagline
            title
            teamImage {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;

const AboutPage = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark;

  // Image
  const hasImage = getSrc(frontmatter.aboutImage).includes("spacer.png")
    ? ""
    : frontmatter.aboutImage.childImageSharp.gatsbyImageData;

  const content = (
    <div sx={aboutStyles.aboutData}>
      {(frontmatter.title || frontmatter.aboutDescription) && (
        <div>
          {frontmatter.title ? (
            <h1 sx={aboutStyles.title}>{frontmatter.title}</h1>
          ) : (
            ""
          )}
          {frontmatter.aboutDescription ? (
            <ReactMarkdown
              sx={aboutStyles.aboutInfo}
              source={frontmatter.aboutDescription}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
  // teams
  const teamData = frontmatter.teamContainer;
  const teamName = teamData.teamText;

  const teamInfo = teamData.teams.map((data, index) => {
    const hasTeamImage = getSrc(data.teamImage).includes("spacer.png")
      ? false
      : true;
    const TeamImage = hasTeamImage
      ? data.teamImage.childImageSharp.gatsbyImageData
      : "";
    return (
      <div key={"Team" + index}>
        <GatsbyImage image={TeamImage} alt={data.title + " - Featured image"} />
        <h1>{data.title}</h1>
        <span>{data.tagline}</span>
      </div>
    );
  });

  // timelime
  const timelineData = frontmatter.timelineContainer;
  const timelineName = timelineData.timelineText;
  const timelineInfo = timelineData.timeline.map((info, index) => {
    const startdate = info.startDate === "0000-01-01" ? "" : info.startDate;
    const enddate = info.endDate === "0000-01-01" ? "" : info.endDate;
    return (
      <div sx={aboutStyles.timelineCard} key={"timeline" + index}>
        {info.title ? <h3 sx={aboutStyles.timelineTitle}>{info.title}</h3> : ""}
        <div sx={aboutStyles.timelineMeta}>
          {info.tagline ? <p sx={aboutStyles.tagline}>{info.tagline}</p> : ""}
          {info.title ? (
            <div sx={aboutStyles.date}>
              <span>{startdate}</span>
              <span sx={aboutStyles.endDate}>
                {info.working === true ? "Present" : enddate}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        {info.description ? (
          <p sx={aboutStyles.description}>{info.description}</p>
        ) : (
          ""
        )}
      </div>
    );
  });

  return (
    <Layout sx={aboutStyles.aboutContainer}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.aboutDescription}
      />
      <div sx={{ variant: "variants.container" }}>
        <GatsbyImage
          image={hasImage}
          alt={frontmatter.title}
          sx={{ borderRadius: "12px" }}
        />
        {content}
        {timelineData.hideTimeline === false ? (
          ""
        ) : (
          <div
            sx={{ maxWidth: "75ch", margin: "0 auto", color: "primaryColor" }}
          >
            <h2>{timelineName}</h2>
            {timelineInfo}
          </div>
        )}

        {teamData.hideTeam === false ? (
          ""
        ) : (
          <div sx={aboutStyles.teams}>
            <h2>{teamName}</h2>
            <div sx={aboutStyles.teamList}>{teamInfo}</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AboutPage;

const aboutStyles = {
  aboutContainer: {
    variant: "variants.section",
    pt: [4, 4, 7],
  },
  title: {
    color: "SecondaryColor",
    m: 0,
    p: 0,
    mb: 3,
    letterSpacing: "1px",
  },
  aboutInfo: {
    maxWidth: "75ch",
    margin: "0 auto",
    overflow: "hidden",
    variant: "variants.markdown",
  },
  aboutData: {
    maxWidth: "75ch",
    m: "0 auto",
    variant: "variants.section",
  },

  // Timeline
  timelineCard: {
    pb: 6,
    position: "relative",
    ml: "60px",
    "&::after": {
      content: "''",
      position: "absolute",
      width: "3px",
      bg: "textColor",
      opacity: "0.3",
      top: "0",
      bottom: "-5px",
      left: "-49px",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      bg: "textColor",
      left: "-57px",
      zIndex: "1",
    },
  },
  tagline: {
    m: 0,
    color: "textColor",
    fontSize: 3,
    lineHeight: "20px",
  },
  timelineTitle: {
    fontSize: 5,
    mt: 1,
    mb: 0,
    color: "SecondaryColor",
  },
  timelineMeta: {
    color: "titleColor",
    fontSize: 2,
    my: 2,
  },
  date: {
    mt: 3,
    span: {
      fontSize: 2,
      fontWeight: "500",
    },
  },
  endDate: {
    "&::before": {
      content: "'—'",
      mx: 2,
    },
  },
  description: {
    color: "textColor",
    fontSize: 3,
    maxWidth: "60ch",
  },
  skills: {
    fontSize: 3,
    m: 0,
    color: "textColor",
    mb: 1,
  },
  sectionTitle: {
    mt: 6,
  },
  teams: {
    variant: "variants.section",
    h2: {
      textAlign: "center",
      color: "primaryColor",
    },
  },
  teamList: {
    display: "grid",
    gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"],
    columnGap: "30px",
    rowGap: ["30px", "30px", "60px"],
    h1: {
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
    span: {
      display: "block",
      mt: 2,
      color: darken("titleColor", 0.05),
    },
    img: {
      borderRadius: "6px",
      height: "250px",
      "-webkit-transform": "scale(1)",
      transform: "scale(1)",
      " -webkit-transition": ".2s linear",
      transition: "filter .2s linear",
      ":hover": {
        " -webkit-transform": "scale(1)",
        transform: "scale(1.1)",
        filter: "grayscale(1.1)",
        opacity: "0.5",
      },
    },
  },
};
