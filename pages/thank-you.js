import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThankYou() {
  return (
    <>
      <Header />
      <main className="p-8 bg-beige-wood text-center">
        <h1 className="text-4xl font-bold">Thank You!</h1>
        <p className="mt-4 text-dark-gray">
          Your order has been successfully placed. You’ll receive a confirmation email shortly.
        </p>
        <p className="mt-2 text-dark-gray">
          Shisha will be delivered in foil packets, 10 packets per plastic container.
        </p>
      </main>
      <Footer />
    </>
  );
}