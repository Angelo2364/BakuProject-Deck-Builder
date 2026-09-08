export default function CardGrid({ children, isEmpty, emptyLabel }) {
  if (isEmpty) {
    return <div className="card-grid card-grid--empty">{emptyLabel}</div>;
  }
  return <div className="card-grid">{children}</div>;
}
