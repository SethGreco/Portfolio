var y = document.getElementById("time-stamp");
z = new Date();

window.onload = function () {
  time = z.getHours();
  if (time < 12 && time > 3) {
    y.innerHTML = "Good Morning";
  } else if (time > 12 && time < 18) {
    y.innerHTML = "Good Afternoon";
  } else {
    y.innerHTML = " Good Evening";
  }
};