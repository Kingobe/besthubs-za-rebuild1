import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../lib/cart";
import { useRouter } from "next/router";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    const order = {
      id: Date.now().toString(),
      restaurant_id: "test@restaurant.com", // Replace with actual user email in production
      products: cart.map((item) => ({ id: item.id, quantity: 1 })),
      total_amount: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toISOString(),
    };

    const response = await fetch("/api/payfast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const { paymentUrl } = await response.json();
    router.push(paymentUrl);
  };

  return (
    <>
      <Header />
      <main className="p-8 bg-beige-wood">
        <h2 className="text-3xl font-bold">Cart</h2>
        <ul className="mt-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span className="text-dark-gray">{item.product_name} - R{item.price}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-dark-gray">Total: R{cart.reduce((sum, item) => sum + item.price, 0)}</p>
        <p className="mt-2 text-dark-gray">Shisha will be delivered in foil packets, 10 packets per plastic container.</p>
        <button onClick={handleCheckout} className="mt-4 p-2 bg-gold-500 text-white rounded">Checkout</button>
      </main>
      <Footer />
    </>
  );
}