interface ListProps<T> {
  data: Array<T>;
  render: (data: T) => React.ReactNode;
}

export default function List<T>({ data, render }: ListProps<T>) {
  return (
    <div>
      <div>Count: {data.length}</div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{render(item)}</li>
        ))}
      </ul>
    </div>
  );
}
