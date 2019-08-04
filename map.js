import _regeneratorRuntime from "babel-runtime/regenerator";

var initMap = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var home, map, pins, marker;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Home location of map
            home = { lat: 29.4241, lng: -98.4936 };

            // Set up the map, zoom and center

            map = new google.maps.Map(document.querySelector(".map"), {
              zoom: 4,
              center: home
            });

            //Fetch records from mongoDB

            _context.next = 4;
            return getData();

          case 4:
            pins = _context.sent;


            //iterate over the records and turn each one into a marker.
            for (i = 0; i < pins.length; i++) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(pins[i].lat, pins[i].long),
                map: map
              });
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initMap() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getData() {
  return fetch("http://localhost:3000/get").then(function (response) {
    return response.json();
  });
}