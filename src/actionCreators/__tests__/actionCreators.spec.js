import {
  executeWorker,
  sendMessage,
  terminateWorker,
} from '..';

import {
  EXECUTE_WORKER,
  SEND_MESSAGE,
  TERMINATE_WORKER,
} from '../../actions';

describe('actions', () => {
  describe('executeWorker action creator', () => {
    it('should create an action to execute a worker process', () => {
      const id = 1;
      const expectedAction = {
        type: EXECUTE_WORKER,
        payload: { id },
      };
      expect(executeWorker(id)).toEqual(expectedAction);
    });
  });

  describe('sendMessage action creator', () => {
    it('should create an action to send a message to a worker process', () => {
      const id = 1;
      const message = 'test message';
      const expectedAction = {
        type: SEND_MESSAGE,
        payload: { id, message },
      };
      expect(sendMessage(id, message)).toEqual(expectedAction);
    });
  });

  describe('terminateWorker action creator', () => {
    it('should create an action to terminate a worker process', () => {
      const id = 1;
      const expectedAction = {
        type: TERMINATE_WORKER,
        payload: { id },
      };
      expect(terminateWorker(id)).toEqual(expectedAction);
    });
  });
});
