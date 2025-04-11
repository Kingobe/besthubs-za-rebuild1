import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-dark-gray text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gold-500">Best Hubs</h1>
      </Link>
      <nav>
        <Link href="/cart" className="text-gold-500 mr-4">Cart</Link>
        {session ? (
          <>
            <span className="mr-4">Welcome, {session.user.email}</span>
            <button onClick={() => signOut()} className="text-gold-500">Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn()} className="text-gold-500">Sign In</button>
        )}
      </nav>
    </header>
  );
}