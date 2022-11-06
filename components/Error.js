export default function Error({ error }) {
  return (
    <>
      <h1 className="mb-2 text-center text-4xl">Error</h1>
      <p className="text-center">{error}</p>
    </>
  );
}
