// Vanilla Javascript to grab users time and display a greeting

var y = document.getElementById("time-stamp");
z = new Date();

window.onload = () => {
  time = z.getHours();
  // console.log(time);
  if (time < 12 && time >= 3) {
    y.innerHTML = "Good Morning";
  } else if (time >= 12 && time <= 18) {
    y.innerHTML = "Good Afternoon";
  } else {
    y.innerHTML = " Good Evening";
  }
};

// Smooth Scrolling
$("#main-nav a").on("click", function(event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});
