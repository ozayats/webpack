import { sayHi } from './sayHi/sayHi';
import { addImage } from './addImage';
import Heading from './heading/heading';
import React from 'react'

const heading = new Heading;
heading.render('hello');

sayHi();
addImage();