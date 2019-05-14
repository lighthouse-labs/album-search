import { useEffect } from "react";

export default function useDebounce(operation, ms, deps) {
  useEffect(() => {
    const handle = setTimeout(() => operation(), ms);
    return () => clearTimeout(handle);
  }, deps);
}
