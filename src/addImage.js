import Screenshot from './screenshot.png';
import AltText from './altText.txt';
 
export function addImage() {
    const img = document.createElement('img');
    img.alt = AltText;
    img.width = 500;
    img.src = Screenshot;
    const body = document.querySelector('body');
    body.appendChild(img);
}