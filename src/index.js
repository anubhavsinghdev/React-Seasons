import React from "react";
import ReactDOM from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, long: null, errMsg: "" };
  // }
  state = { lat: null, long: null, errMsg: "" }; // same as constructor above (by babel)

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }),
      (err) => this.setState({ errMsg: "User Rejected GeoLocation" })
    );
  }

  renderContent() {
    if (this.state.errMsg && !this.state.lat && !this.state.long) {
      return <div>Error : {this.state.errMsg}</div>;
    } else if (this.state.lat && this.state.long) {
      return <SeasonDisplay lat={this.state.lat} />;
    } else {
      return <Spinner message="Please accept location request!!" />;
    }
  }

  render() {
    return this.renderContent();
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);