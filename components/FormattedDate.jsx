
export default function FormattedDate({data}) {
  const date = new Date(data);
  console.log(data)
  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div>{formattedDate}</div>
  )
}
