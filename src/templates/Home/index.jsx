import "./styles.css";
import { Component } from "react";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchString: "",
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchString: value });
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  render() {
    const { posts, page, postsPerPage, allPosts, searchString } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchString
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchString.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchString && (
            <>
              <h1>Search value: {searchString}</h1>
            </>
          )}
          <TextInput
            searchString={searchString}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && (
          <p>
            There's no posts with <strong>{searchString}</strong>.
          </p>
        )}

        <div className="button-container">
          {!searchString && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
