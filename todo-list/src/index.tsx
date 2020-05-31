import { render } from 'react-dom';
import React from 'react';
import TodoListApp from './App';

const rootElement = document.getElementById('root')

render(<TodoListApp />, rootElement)