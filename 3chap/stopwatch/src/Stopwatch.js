import React, { Component } from "react";
import "./Stopwatch.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLive: false,
      curTime: 0,
      startTime: 0,
    };
    this.timerId = 0;
  }

  componentWillMount() {
    this.timerId = setInterval((e) => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    if (this.state.isLive) {
      const v = new Date().getTime();
      this.setState({ curTime: v });
    }
  }

  clickHandler(e) {
    // 停止する時
    if (this.state.isLive) {
      this.setState({ isLive: false });
      return;
    }
    // 開始する時
    const v = new Date().getTime();
    this.setState({
      curTime: v,
      startTime: v,
      isLive: true,
    });
  }
  //時刻表示
  getDisp() {
    const s = this.state;
    const delta = s.curTime - s.startTime;
    // console.log("delta" + delta);
    const t = Math.floor(delta / 1000);
    const ss = t % 60;
    const m = Math.floor(t / 60);
    const mm = m % 60;
    const hh = Math.floor(m / 60);
    const z = (num) => {
      const s = "00" + String(num);
      return s.substr(s.length - 2, 2);
    };
    console.log("hh" + hh + "mm" + mm + "ss" + ss);
    return (
      <span className="disp">
        {z(hh)}:{z(mm)}:{z(ss)}
      </span>
    );
  }
  //画面描写
  render() {
    let label = "START";
    if (this.state.isLive) label = "STOP";
    const disp = this.getDisp();
    const fclick = (e) => this.clickHandler(e);
    return (
      <div className="Stopwatch">
        <div>{disp}</div>
        <button onClick={fclick}>{label}</button>
      </div>
    );
  }
}

export default Stopwatch;
