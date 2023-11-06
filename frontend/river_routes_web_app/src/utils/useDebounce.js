import {useEffect , useState} from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValues, setDebouncedValue] = useState(value);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedValue(value);
    }, delay);

    return ()=>{
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValues;
};
