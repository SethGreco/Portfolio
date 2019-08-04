"use strict";

const btnStyle = {
  background: "#444",
  color: "#fff",
  fontSize: "1.3rem",
  borderRadius: "7px",
  padding: "15px"
};

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
    window.navigator.geolocation.getCurrentPosition(position => {
      // we called setstate
      this.setState({ lat: position.coords.latitude });
      this.setState({ long: position.coords.longitude });
      console.log(this.state.long, this.state.lat);
    });
  }

  postCords() {
    const { lat, long } = this.state;
    const loc = { lat, long };
    const url = "http://localhost:3000/add";
    const conf = {
      method: "post",
      body: JSON.stringify(loc),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(url, conf).then(response => console.log(response));
  }

  render() {
    if (this.state.liked) {
      return this.state.lat + ", " + this.state.long;
    }

    return (
      <button style={btnStyle} onClick={() => this.postCords()}>
        Post Your Coords!
      </button>
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
