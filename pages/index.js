import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../lib/cart";
import { query } from "../lib/dynamodb";

export default function Home({ products }) {
  const { addToCart } = useCart();
  return (
    <>
      <Header />
      <main className="p-8 bg-beige-wood">
        <h1 className="text-4xl font-bold text-center">Best Hubs</h1>
        <p className="mt-2 text-center text-dark-gray">
          Premium shisha tobacco and accessories for South Africa’s finest restaurants.
        </p>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <li key={p.id} className="card p-4 rounded bg-white">
              <h3 className="text-xl font-semibold">
                {p.product_name}{p.flavour ? ` (${p.flavour})` : ""}
              </h3>
              <p className="text-dark-gray mt-1">{p.description}</p>
              <p className="mt-2 font-bold text-dark-gray">R{p.price}</p>
              <button
                onClick={() => addToCart(p)}
                className="mt-3 p-2 bg-gold-500 text-white rounded w-full"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const data = await query("Products", { FilterExpression: "in_stock = :s", ExpressionAttributeValues: { ":s": true } });
  return { props: { products: data.Items } };
}