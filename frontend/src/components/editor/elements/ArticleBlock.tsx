import { FC } from "react";
import logo from "../../../assets/logo.svg";

interface ArticleBlockProps {
  name: string;
  username: string;
  text: string;
}

const ArticleBlock: FC<ArticleBlockProps> = ({ name, username, text }) => {
  return (
    <div
      className="box"
      style={{ margin: 0, height: "100%", paddingBottom: "40px" }}
    >
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={logo} alt="Logo" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong> <small>@{username}</small>{" "}
              <small>31m</small>
              <br />
              {text}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleBlock;
