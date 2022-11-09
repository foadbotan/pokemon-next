export default function Error({ error }) {
  console.error(error);
  return (
    <>
      <h1 className="mb-2 text-center text-2xl">Error</h1>
      <p className="text-center">{error}</p>
    </>
  );
}
