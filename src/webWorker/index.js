/**
 *
 * @param {function} fn The function to run as a web worker
 */

// eslint-disable-next-line no-undef
export const run = (fn, onMessage) => new Worker(URL.createObjectURL(new Blob([`self.onmessage = ${onMessage};(${fn})()`])));
