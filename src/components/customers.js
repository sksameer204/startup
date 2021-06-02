/** @jsx jsx */
import { jsx } from "theme-ui";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";

const Customers = (props) => {
  const images = props.data.customerImages;

  const customersLogo = images.map((customer, index) => {
    const hasImage = getSrc(customer.customerImage) ? true : false;
    const customerImage =
      hasImage === true
        ? customer.customerImage.childImageSharp.gatsbyImageData
        : "";
    const CustomerName = customer.customerName ? customer.customerName : "";
    return (
      <div sx={customerStyles.customerImg} key={"CImg" + index}>
        {customerImage !== "" ? (
          <GatsbyImage image={customerImage} alt={CustomerName} />
        ) : (
          <div
            sx={customerStyles.logo}
            style={{
              mask:
                "url('" +
                customer.customerImage.publicURL +
                "') no-repeat center / contain",
              WebkitMask:
                "url('" +
                customer.customerImage.publicURL +
                "') no-repeat center / contain",
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div sx={customerStyles.customerContainer}>
      <div sx={customerStyles.customers}>
        <div sx={customerStyles.customerData}>
          <h2>{props.data.title}</h2>
          <p sx={customerStyles.title}>{props.data.description}</p>
        </div>
        <div sx={customerStyles.customerImages}>{customersLogo}</div>
      </div>
    </div>
  );
};

export default Customers;

const customerStyles = {
  customerContainer: {
    variant: "variants.section",
  },
  logo: {
    opacity: "0.5",
    height: "60px",
    bg: "textColor",
    mx: [3, 0],
  },
  customers: {
    variant: "variants.container",
    gridGap: 7,
    alignItems: "center",
  },
  customerImages: {
    maxWidth: ["100%", "90%", "80%", "70%"],
    m: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    columnGap: [0, 7],
    rowGap: 5,
  },
  customerImg: {
    width: "150px",
    ".gatsby-image-wrapper": {
      width: "100%",
      mx: "auto",
      filter: "grayscale(1)",
      opacity: "0.9",
      textAlign: "center",
      transition: "filter .3s linear, opacity .3s linear",
    },
  },
  customerData: {
    variant: "variants.pageHead",
  },
};
