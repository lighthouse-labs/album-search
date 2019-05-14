/* Debounce wrapper to prevent constant requests */
function createDebounce(operation, ms) {
  /* Keep track of the timeout so it ca be cleared */
  let timeout = null;

  return function() {
    /* This function has been called but the previous timeout hasn't fired */
    if (timeout) clearTimeout(timeout);

    /* Create a new timeout and wait for next debounce or call operation if no debounce needed */
    timeout = setTimeout(() => operation(...arguments), ms);
  };
}
