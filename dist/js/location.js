"use strict";

// React component Class based
class LikeButton extends React.Component {
  // Create constructor be sure to call super()
  constructor(props) {
    super(props);
    // define the variables in state
    this.state = {
      lat: null,
      long: null,
      liked: false
    };
  }

  // function to prompt user for their geo position
  getUserLocation() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ long: position.coords.longitude });
      },
      err => this.refs.btn.setAttribute("disabled", "disabled")
    );
  }

  // function for the onclick react button.  Well call getUserLocation
  // then proceed to define a POST method to remote DB
  postCords() {
    this.getUserLocation();
    const { lat, long } = this.state;
    const loc = { lat, long };
    const url = "https://fierce-crag-41814.herokuapp.com/add";
    const conf = {
      method: "post",
      body: JSON.stringify(loc),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    if (loc.lat === null || loc.long === null) {
    } else {
      if (window.confirm("Please Confirm Coordinate Submission")) {
        fetch(url, conf).then(response => console.log(response)),
          this.refs.btn.setAttribute("disabled", "disabled");
      }
    }
  }

  render() {
    if (this.state.liked) {
      return this.state.lat + ", " + this.state.long;
    }
    return (
      <div>
        <button
          ref="btn"
          onClick={() => {
            this.postCords();
          }}
        >
          Post Your Coords!
        </button>
      </div>
    );
  }
}

const domContainer = document.querySelector("#React");
ReactDOM.render(<LikeButton />, domContainer);
