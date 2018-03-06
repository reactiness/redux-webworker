import { localStore } from './store';
import { WebWorker } from '../models';
import { run } from '../webWorker';
import {
  EXECUTE_WORKER,
  SEND_MESSAGE,
  TERMINATE_WORKER,
} from '../actions';

/**
 * Pre-register a web worker that gets triggered on an action
 * @param {function} fn The function to execute
 * @param {string} id A unique ID to represent this web worker
 * @param {string} triggerAction The action that triggers this function
 * @param {string} successAction The action that should be dispatched on success
 * @param {string} failAction The action that should be dispatch on failure
 */
export const registerWebWorker = (props) => {
  localStore[props.id] = new WebWorker(props);
};

/**
 * Handle a message action
 */
const handleMessage = (action, store) => {
  const worker = store[action.payload.id];
  const webWorker = worker.instance;
  if (webWorker) webWorker.postMessage(action.payload.message);
};

/**
 * Check for a trigger, and if found: execute the Web Worker.
 * If no trigger found, pass to next middleware.
 */
const handleCheckForTrigger = (action, store, next) => {
  const worker = Object
    .keys(store)
    .map(key => store[key])
    .find(w => w.triggerAction === action.type);

  if (worker) {
    const webWorker = run(worker.fn, worker.onMessage);
    webWorker.onmessage = m => console.error('not yet implemented', m);
    webWorker.onerror = e => console.error('not yet implemented', e);
    webWorker.postMessage('');
    worker.instance = webWorker;
  }

  return next(action);
};

const handleTerminateWorker = (action, store) => {
  const worker = store[action.payload.id];
  if (worker.instance) {
    worker.instance.terminate();
    worker.instance = undefined;
  }
};

const handleExecuteWorker = (action, store) => {
  const worker = store[action.payload.id];
  if (worker.instance) handleTerminateWorker(action, store);
  const webWorker = run(worker.fn, worker.onMessage);
  webWorker.onmessage = m => console.error('not yet implemented', m);
  webWorker.onerror = e => console.error('not yet implemented', e);
  webWorker.postMessage(''); // run it
  worker.instance = webWorker;
};

/**
 * Redux Webworker Middelware factory
 */
export const createWebWorkerMiddleware = () => (/* store */) => next => (action) => {
  switch (action.type) {
    case SEND_MESSAGE: return handleMessage(action, localStore);
    case EXECUTE_WORKER: return handleExecuteWorker(action, localStore);
    case TERMINATE_WORKER: return handleTerminateWorker(action, localStore);
    default: return handleCheckForTrigger(action, localStore, next);
  }
};

// eslint-disable-next-line no-undef
window.TEMP_STORE = localStore;
