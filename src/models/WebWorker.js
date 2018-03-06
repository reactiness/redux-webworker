export class WebWorker {

  constructor ({
    fn,
    onMessage,
    triggerAction,
    successAction,
    failAction,
    messageAction
  }) {
    this.fn = fn;
    this.onMessage = onMessage;
    this.triggerAction = triggerAction;
    this.successAction = successAction;
    this.failAction = failAction;
    this.messageAction = messageAction;
    this.instance = undefined;
  }
}
