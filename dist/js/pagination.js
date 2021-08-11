
// Create a pagination scroll menu to cycle through projects

const container = document.getElementById("pagination");

document.getElementById("page-forward").onclick = () => {
  let proj1 = document.getElementById("project-selector-1")
  let proj2 = document.getElementById("project-selector-2")

  let header = document.getElementById("project-header")
  let summary = document.getElementById("project-summary")
  let tech = document.getElementById("project-tech")
  let link = document.getElementById("project-link")
  let github= document.getElementById("project-github")
  if (proj1.hasAttribute("class", "active")) {
    proj1.removeAttribute("class");
    proj2.setAttribute("class", "active")
    header.innerHTML = "Day Starter"
    summary.innerHTML = "Day Starter is a quick web app I built to play around with web services and generate some data that would be useful to the end user. It gives the user (based on their location) the current weather, traffic map and news articles. Currently it is still a Work-in-progress but core componenets are functional and interactive."
    tech.innerHTML = "Tech-Stack: Javascript, HTML5, MaterializeCSS, NodeJS/Express"
    link.setAttribute("href", "")
    github.setAttribute("href","https://github.com/SethGreco/DayStarter")
  }else if (proj2.hasAttribute("class", "active")){

    proj2.removeAttribute("class");
    proj1.setAttribute("class", "active")
    header.innerHTML = "React-Photo-Gallery"
    summary.innerHTML = "This is a React application and my first React application I have really completed to get a better understanding. I used mostly funcational components and hooks to complete this. Utlizing the Flickr API I call photos from my landscape photography based on state. Interacting with a USA SVG map to get the state photos I have accumlated. Other tech used in this is my own webpack and babel configurations. I compiled down the code to host it in the codebase of the portfolio page. essentially taking the down the entire React project into 1 file."
    tech.innerHTML = "Tech-Stack: React, Sass, Webpack/Babel"
    link.setAttribute("href", "https://grecowebdev.com/gallery")
    github.setAttribute("href","https://github.com/SethGreco/React-Photo-Gallery")
  }

  

  
  
};


