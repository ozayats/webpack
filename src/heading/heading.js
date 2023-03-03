import "./heading.scss";

export default class Heading {
  render(page) {
    const heading = document.createElement("h1");
    heading.className = "heading";
    heading.innerHTML = `welcome friend! this is "${page}"`;
    const body = document.querySelector("body");
    body.appendChild(heading);
  }
}
