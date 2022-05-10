function throttleDecorator(f, ms = 200) {
  let isThrottled = false;
  let xThis, xArgs;

  function wrapper(...args) {
    if (isThrottled) {
      xThis = this;
      xArgs = args;
      return;
    }

    f.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (xArgs & xThis) {
        wrapper.apply(xThis, xArgs);
        xArgs = xThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export { throttleDecorator };
