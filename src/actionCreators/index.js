import {
  EXECUTE_WORKER,
  SEND_MESSAGE,
  TERMINATE_WORKER
} from '../actions';

export const executeWorker = (id) => ({ type: EXECUTE_WORKER, payload: { id } });

export const sendMessage = (id, message) => ({ type: SEND_MESSAGE, payload: { id, message } });

export const terminateWorker = (id) => ({ type: TERMINATE_WORKER, payload: { id } });
