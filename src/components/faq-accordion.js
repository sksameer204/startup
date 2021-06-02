/** @jsx jsx */
import { jsx } from "theme-ui";
import { Component } from "react";

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccordion: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showAccordion: !state.showAccordion,
    }));
  }

  render() {
    return (
      <div sx={accordionStyle.accordionField} className="accordionField">
        <div>
          {this.props.name ? (
            <button
              onClick={this.handleToggleClick}
              className={
                this.state.showAccordion ? "accordion is-active" : "accordion"
              }
            >
              {this.props.name}
            </button>
          ) : (
            ""
          )}
          {this.props.content ? (
            <div sx={accordionStyle.accordion} className="accordion-container">
              <p>{this.props.content}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const accordionStyle = {
  accordionField: {
    maxWidth: "75ch",
    m: "0 auto",
    mb: 5,
    borderBottom: "1px solid",
    borderColor: "borderColor",
    button: {
      p: 0,
      fontSize: 3,
      bg: "transparent",
      border: "none",
      cursor: "pointer",
      width: "auto",
      mb: 2,
      color: "titleColor",
      textAlign: "left",
      "&::after": {
        display: "inline-flex",
        content: "'↓'",
        ml: 3,
        color: "SecondaryColor",
      },
    },
    position: ["relative"],
    ".accordion-container": {
      display: "none",
      position: "absolute",
    },
    ".accordion": {
      cursor: "pointer",
      "&.is-active": {
        fontWeight: "600",
        position: "relative",
        zIndex: 1112,
        "&::after": {
          content: "'↑'",
        },
        "+ .accordion-container": {
          display: "contents",
          position: "absolute",
          left: 0,
          animation: "animation 0.3s",
          transition: "linear transform .3s",
          transform: "scale(1)",
          opacity: 1,
          overFlow: "hidden",
          p: {
            display: "block",
            mt: 0,
            mb: 5,
            fontSize: "18px",
            color: "textColor",
          },
        },
      },
    },
  },
};
