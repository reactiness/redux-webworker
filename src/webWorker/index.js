/**
 * 
 * @param {function} fn The function to run as a web worker
 */
export const run = (fn, onMessage) => new Worker(URL.createObjectURL(new Blob(['self.onmessage = '+onMessage+';('+fn+')()'])));
