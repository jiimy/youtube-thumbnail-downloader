export default function PhotoId({ params }: { params: { id: string } }) {
  return <h1>photo/id/page {params.id}</h1>;
}