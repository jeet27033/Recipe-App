import React,{Profiler} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const onRenderCallback = (
  id, 
  phase, 
  actualDuration, 
  baseDuration, 
  startTime, 
  commitTime, 
) => {
  console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime});
};


root.render(
  <React.StrictMode>
    <Profiler id="App" onRender={onRenderCallback}>
    <App />
  </Profiler>
  </React.StrictMode>
);
