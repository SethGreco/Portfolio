"use strict";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
      liked: false
    };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ long: position.coords.longitude });
      },
      err => this.refs.btn.setAttribute("disabled", "disabled")
    );
  }

  // <button
  //         onClick={() => {
  //           this.refreshPage();
  //         }}
  //       >
  //         Reload
  //       </button>
  // refreshPage() {
  //   window.location.reload(false);
  // }

  postCords() {
    const { lat, long } = this.state;
    const loc = { lat, long };
    const url = "http://localhost:3000/add";
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

// Vanilla JS code that gets location
// conflicted with my onload
/* <script>
var x = document.getElementById("location");
var y = document.getElementById("time-stamp");
z = new Date();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}
</script> */
