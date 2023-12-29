import { useEffect, useState } from "react";
// hook này để khi mà nhập input thì sẽ có khoảng thời gian delay, mới gọi api, chứ ko để gọi liên tục

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}