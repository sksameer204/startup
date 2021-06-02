/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri";
import { FaWordpress, FaVk } from "react-icons/fa";

import SocialLinks from "../util/socialmedia.json";

const socialIconsStyles = {
  socialIcons: {
    mt: 5,
    display: "flex",
    a: {
      fontSize: 4,
      display: "block",
      color: "textColor",
      mr: 2,
      "&:hover": {
        color: "SecondaryColor",
      },
      svg: {
        display: "block",
      },
    },
  },
};

const SocialLink = SocialLinks.socialIcons;
const sIcons = SocialLink.map((icons, index) => {
  return (
    <div key={"sIcons" + index}>
      {icons.icon === "facebook" ? (
        <Link to={icons.url} target="_blank">
          <RiFacebookBoxFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "twitter" ? (
        <Link to={icons.url} target="_blank">
          <RiTwitterFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "linkedin" ? (
        <Link to={icons.url} target="_blank">
          <RiLinkedinBoxFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "youtube" ? (
        <Link to={icons.url} target="_blank">
          <RiYoutubeFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "instagram" ? (
        <Link to={icons.url} target="_blank">
          <RiInstagramFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "rss" ? (
        <Link to={icons.url} target="_blank">
          <RiRssFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "github" ? (
        <Link to={icons.url} target="_blank">
          <RiGithubFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "telegram" ? (
        <Link to={icons.url} target="_blank">
          <RiTelegramFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "pinterest" ? (
        <Link to={icons.url} target="_blank">
          <RiPinterestFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "snapchat" ? (
        <Link to={icons.url} target="_blank">
          <RiSnapchatFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "skype" ? (
        <Link to={icons.url} target="_blank">
          <RiSkypeFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "wordpress" ? (
        <Link to={icons.url} target="_blank">
          <FaWordpress />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "dribbble" ? (
        <Link to={icons.url} target="_blank">
          <RiDribbbleFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "medium" ? (
        <Link to={icons.url} target="_blank">
          <RiMediumFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "behance" ? (
        <Link to={icons.url} target="_blank">
          <RiBehanceFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "vk" ? (
        <Link to={icons.url} target="_blank">
          <FaVk />
        </Link>
      ) : (
        ""
      )}
    </div>
  );
});

const SocialIcons = () => {
  return <div sx={socialIconsStyles.socialIcons}>{sIcons}</div>;
};

export default SocialIcons;
