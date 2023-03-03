import './sayHi.scss';

export const sayHi = () => {
    const hiButton = document.createElement('button');
    hiButton.className = 'hiButton';
    hiButton.innerHTML = 'press to console "hi"';
    hiButton.addEventListener('click', () => console.log('Hello in webpack'));
    const body = document.querySelector('body');
    body.appendChild(hiButton);
    
};