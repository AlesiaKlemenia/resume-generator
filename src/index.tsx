import React from 'react';
import ReactDOM from 'react-dom/client';
import {InitialComponent} from "./components/InitialComponent";

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<InitialComponent />);