import { FC } from "react";

const ArticleBlock: FC = () => {
  return (
    <div
      className="box"
      style={{ margin: 0, height: "100%", paddingBottom: "40px" }}
    >
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img
              src="https://avatars1.githubusercontent.com/u/10220449?v=3&s=460"
              draggable="false"
              alt="github avatar"
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>bokuweb</strong> <small>@bokuweb17</small>{" "}
              <small>31m</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              efficitur sit amet massa fringilla egestas. Nullam condimentum
              luctus turpis.
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a href="/" className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-reply" />
                </span>
              </a>
              <a href="/" className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-retweet" />
                </span>
              </a>
              <a href="/" className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default ArticleBlock;