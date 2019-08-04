"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var btnStyle = {
  color: "yellow",
  background: "blue"
};

var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.state = {
      lat: null,
      long: null,
      liked: false
    };
    return _this;
  }

  _createClass(LikeButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.navigator.geolocation.getCurrentPosition(function (position) {
        // we called setstate
        _this2.setState({ lat: position.coords.latitude });
        _this2.setState({ long: position.coords.longitude });
        console.log(_this2.state.long, _this2.state.lat);
      });
    }
  }, {
    key: "postCords",
    value: function postCords() {
      var _state = this.state,
          lat = _state.lat,
          long = _state.long;

      var loc = { lat: lat, long: long };
      var url = "http://localhost:3000/add";
      var conf = {
        method: "post",
        body: JSON.stringify(loc),
        headers: new Headers({ "Content-Type": "application/json" })
      };
      fetch(url, conf).then(function (response) {
        return console.log(response);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.liked) {
        return this.state.lat + ", " + this.state.long;
      }

      return React.createElement(
        "button",
        { style: btnStyle, onClick: function onClick() {
            return _this3.postCords();
          } },
        "Post Your Coords!"
      );
    }
  }]);

  return LikeButton;
}(React.Component);

var domContainer = document.querySelector("#React");
ReactDOM.render(React.createElement(LikeButton, null), domContainer);

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