function RadioInput<T>({
  name,
  value,
  items,
  setValue,
}: {
  name: string;
  value?: string;
  items: { value: string; label: string }[];
  setValue: (v: string) => void;
}) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.value}>
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            checked={item.value === value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
}
export default RadioInput;
