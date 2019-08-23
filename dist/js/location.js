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
  // if user accepts button is hidden
  getUserLocation() {
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({ lat: position.coords.latitude });
      this.setState({ long: position.coords.longitude });
      this.refs.button.setAttribute("hidden", "hidden");
    });
  }

  // function for the onclick react button.  Well call getUserLocation
  // then proceed to define a POST method to remote DB
  // if user hasnt accepted geo request, prompted to do so
  // if user accepts and hits cancel nothing happens
  // if user accepts and hits ok post is made and button is disabled to prevent multiple entries
  postCords() {
    const { lat, long } = this.state;
    const loc = { lat, long };
    const url = "https://fierce-crag-41814.herokuapp.com/add";
    const conf = {
      method: "post",
      body: JSON.stringify(loc),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    if (loc.lat === null || loc.long === null) {
      alert("You haven't accepted the geo request!");
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
          ref="button"
          onClick={() => {
            this.getUserLocation();
          }}
        >
          Get geolocation
        </button>
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
