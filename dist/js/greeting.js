// Vanilla Javascript to grab users time and display a greeting

let y = document.getElementById("time-stamp");
let z = new Date();

window.onload = () => {
  let time = z.getHours();
  if (time < 12 && time >= 3) {
    y.innerHTML = "Good Morning";
  } else if (time >= 12 && time <= 18) {
    y.innerHTML = "Good Afternoon";
  } else {
    y.innerHTML = " Good Evening";
  }
};

// Smooth Scrolling for Nav Bar items
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
