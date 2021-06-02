/** @jsx jsx */
import { jsx } from "theme-ui";
import { IoIosQuote } from "react-icons/io";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Testimonials = (props) => {
  const data = props.data;
  const testimonial = data.map((item, index) => {
    const hasImage = getSrc(item.testimonialImage).includes("spacer.png")
      ? false
      : true;
    const testimonialImg = hasImage
      ? item.testimonialImage.childImageSharp.gatsbyImageData
      : "";
    return (
      <div sx={testimonialsStyles.testimonials}>
        <div sx={testimonialsStyles.testimonialDetails}>
          <div key={"testimonial" + index}>
            <IoIosQuote sx={testimonialsStyles.quoteicon} />
            {item.description ? (
              <p sx={testimonialsStyles.description}>{item.description}</p>
            ) : (
              ""
            )}
            {item.name || item.jobRole ? (
              <div sx={testimonialsStyles.testimonialData}>
                {item.name ? <h3>{item.name}</h3> : ""}
                {item.jobRole ? <span>{item.jobRole}</span> : ""}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div sx={testimonialsStyles.testimonialInfo}>
          <div sx={testimonialsStyles.testimonialContainer}></div>
          <div sx={testimonialsStyles.testimonialContainer1}></div>
          <GatsbyImage
            image={testimonialImg}
            alt={"- Testimonial image"}
            sx={testimonialsStyles.testimonialImg}
          />
        </div>
      </div>
    );
  });

  return (
    <div sx={testimonialsStyles.testimonial}>
      <Carousel
        autoPlay
        infiniteLoop
        transitionTime={500}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        interval={5000}
      >
        {testimonial}
      </Carousel>
    </div>
  );
};

export default Testimonials;

const testimonialsStyles = {
  testimonial: {
    maxWidth: "100%",
    width: "100%",
    pb: 7,
    bg: "testimonials.bgColor",
    ".slide": {
      bg: "transparent",
      textAlign: "left",
    },
    ".control-dots": {
      variant: "variants.container",
      left: 0,
      right: 0,
      bottom: 0,
      margin: "auto",
      textAlign: "left",
    },
    ".carousel .control-dots .dot": {
      bg: "titleColor",
      boxShadow: "none",
    },
  },
  testimonials: {
    variant: "variants.container",
    px: ["20px", "20px", "40px", "40px", "80px"],
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "1.5fr 1fr"],
    alignItems: "center",
    justifyItems: "center",
    gap: "60px",
    my: 7,
  },
  testimonialDetails: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  quoteicon: {
    fontSize: ["100px"],
    color: "SecondaryColor",
    display: "inherit",
  },
  description: {
    fontSize: [3, 4, 4, 5],
    fontWeight: "light",
    lineHeight: 1.3,
    display: "block",
    color: "textColor",
    m: 0,
    pb: 2,
  },
  testimonialData: {
    textTransform: "capitalize",
    h3: {
      fontSize: 5,
      my: 0,
      mt: [2, 3, 4],
      mb: 1,
      color: "titleColor",
    },
    span: {
      mt: 1,
      fontSize: 2,
      color: "textColor",
    },
  },
  testimonialInfo: {
    width: "100%",
    height: "300px",
    position: "relative",
  },
  testimonialContainer: {
    m: "0 auto",
    backgroundImage: (theme) =>
      `linear-gradient(to bottom, ${theme.colors.testimonials.imageTop}, ${theme.colors.testimonials.imageBottom})`,
    width: ["60%", "60%", "80%", "60%", "60%"],
    height: "100%",
    borderRadius: "6px",
  },
  testimonialContainer1: {
    backgroundImage: (theme) =>
      `linear-gradient(to left, ${theme.colors.testimonials.circleColor}, transparent)`,
    width: "100px",
    height: "100px",
    borderRadius: "50px",
    position: "absolute",
    top: "-30px",
    left: ["45px", "85px", "0px", "45px", "45px"],
  },
  testimonialImg: {
    width: ["200px", "200px", "150px", "200px", "200px"],
    height: ["200px", "200px", "150px", "200px", "200px"],
    position: "absolute",
    right: 0,
    borderRadius: "3px",
    mt: ["-150px", "-150px", "-100px", "-150px", "-150px"],
    mr: "45px",
  },
};
