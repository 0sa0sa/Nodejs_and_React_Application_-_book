import { Component } from "react";
import ReactDOM from "react-dom";
const { clipboard } = require("electron");

export default class App extends Component {
  constructor(porps) {
    super(props);
    this.state = {
      text: "",
      isActive: false,
      zen2han: true,
    };
    setInterval((e) => this.tick(), 1000);
  }

  convToHalfWidth(str) {
    const s2 = str.replace(/[!-~]/g, (e) => {
      return String.fromCharCode(e.charCodeAt(0) - 0xfee0);
    });
    return s2;
  }

  tick() {
    if (!this.state.isActive) return;
    const clip = clipboard.readText();
    let clip2 = clip;
    if (this.state.zen2han) {
      clip2 = this.convToHalfWidth(clip);
    }
    if (clip !== clip2) {
      clipboard.writeText(clip2);
    }
    this.setState({ text: clip });
  }
  changeState(e) {
    const name = e.target.name;
    this.setState({ [name]: !this.state[name] });
  }

  render() {
    const taStyle = {
      width: "100%",
      height: "300px",
      backgroundColor: "#f4f4f4",
    };
    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-sm sidebar">
              <div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.isActive}
                        name="isActive"
                        onChange={(e) => this.changeState(e)}
                      />
                      監視を有効に
                    </label>
                  </li>
                  <li className="list-group-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.zen2han}
                        name="zen2han"
                        onChange={(e) => this.changeState(e)}
                      />
                      全角英数を半角に
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pane">
              <div className="padded-more">
                クリップボード:
                <br />
                <textarea style={taStyle} value={this.state.text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
