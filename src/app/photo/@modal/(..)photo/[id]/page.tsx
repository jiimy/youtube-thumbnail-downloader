export default function InterceptedModalPhotoId({
  params,
}: {
  params: { id: string };
}) {
  return <h1>Intercepted photo/@modal/(..)photo/[id]/page {params.id}</h1>;
}