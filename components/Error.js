import Layout from "./Layout";

export default function Error({ error }) {
  return (
    <Layout>
      <h1 className="mb-2 text-center text-4xl">Error</h1>
      <p className="text-center">{error}</p>
    </Layout>
  );
}
