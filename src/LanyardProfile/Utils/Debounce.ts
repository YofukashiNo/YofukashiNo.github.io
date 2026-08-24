import React from "react";

export default <V, S extends React.Dispatch<React.SetStateAction<V>>>(
  initialValue: V,
  onDebouncedChange: S,
  delay?: number,
  onDebounce?: () => unknown,
): [V, S] => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    const id = setTimeout(() => {
      onDebouncedChange(value);
      onDebounce?.();
    }, delay || 100);

    return () => clearTimeout(id);
  }, [value, delay, onDebouncedChange]);

  return [value, setValue as S];
};
