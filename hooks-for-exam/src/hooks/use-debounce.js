function useDebounce() {
  const timer = useRef(null);

  return useCallback((callback, delay) => {
    return (...args) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);
}
