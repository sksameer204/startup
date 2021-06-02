/** @jsx jsx */
import { jsx } from "theme-ui";
import ConvertKitForm from "convertkit-react";
import Integration from "../util/integrations.json";
import { lighten } from "@theme-ui/color";

const config = {
  formId: Integration.convertkit.formId,
  submitText: Integration.convertkit.submitText
    ? Integration.convertkit.submitText
    : "Subscribe",
};

const Convertkit = () => {
  return (
    <div sx={{ ...convertkitStyles }}>
      <h3>
        {Integration.convertkit.Title
          ? Integration.convertkit.Title
          : "Subscribe for the latest updates from us"}
      </h3>
      <p>
        {Integration.convertkit.subscribeDescription
          ? Integration.convertkit.subscribeDescription
          : "We respect your privacy. you can Unsubscribe at any time"}
      </p>
      <ConvertKitForm {...config} />
    </div>
  );
};

export default Convertkit;

const convertkitStyles = {
  padding: 4,
  borderRadius: "12px",
  bg: "primaryBgColor",
  border: "2px solid",
  borderColor: "borderColor",
  my: 7,
  h3: {
    fontSize: 4,
    fontWeight: 900,
    m: 0,
    color: "primaryColor",
  },
  p: {
    fontSize: 2,
    color: lighten("textColor", 0.1),
    m: 0,
    opacity: 0.8,
  },
  input: {
    py: 3,
    px: 5,
    mt: 5,
    mr: 3,
    width: ["100%", "100%", "100%", "35%"],
    appearance: "none",
    border: "1px solid",
    borderColor: "borderColor",
    borderRadius: "6px",
    bg: "#fff",
    fontSize: 1,
    outline: "none",
  },
  button: {
    variant: "variants.button",
    fontFamily: "inherit",
    py: 3,
    fontSize: 1,
  },
};
