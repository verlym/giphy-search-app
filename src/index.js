import React from "react";
import ReactDOM from "react-dom";
import GifList from "./components/SearchComponent/GifList";
import GifModal from "./components/SearchComponent/GifModal";
import SearchBar from "./components/SearchComponent/SearchBar";
import request from "superagent";
import "./styles/style.css";
import { Typography, Image, Button, Space } from "antd";

const { Title } = Typography;
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false,
      isIronMan: true,
    };
  }

  handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(
      /\s/g,
      "+"
    )}&api_key=JmZ0IjHl7QOcOdwXUjYRYWyeMzsXDs44&limit=9`;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data });
    });
  }

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null,
    });
  }

  handleClickIronMan = (e) => {
    e.preventDefault();
    this.setState({
        isIronMan: true,
      });
    this.handleTermChange('iron man')
  }
  handleClickSearch = (e) => {
    e.preventDefault();
    this.setState({
        isIronMan: false,
      });
    this.handleTermChange('')
  }

  render() {
    return (
      <div>
        <Title class="center">WELCOME TO OUR GIPHY</Title>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Giphy-logo.svg/1280px-Giphy-logo.svg.png" />
       <div class="btn">
       <Space align="center">
          <Button  type="text" onClick={this.handleClickIronMan}>Iron Man Giphy</Button>
        </Space>
       </div>
       <div class="btn">
        <Space align="center">
          <Button  type="text" onClick={this.handleClickSearch}>Search Your Giphy</Button>
        </Space>
        </div>
        {!this.state.isIronMan && <SearchBar onTermChange={(term) => this.handleTermChange(term)} />}
        <GifList
          gifs={this.state.gifs}
          onGifSelect={(selectedGif) => this.openModal(selectedGif)}
        />
        <GifModal
          modalIsOpen={this.state.modalIsOpen}
          selectedGif={this.state.selectedGif}
          onRequestClose={() => this.closeModal()}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
