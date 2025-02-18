import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
      <header className="w-full flex justify-between p-4">
        <div className="font-bold text-2xl">My Landing Page</div>
        <SignedOut>
          <SignInButton className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
            Sign In
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-semibold">Welcome to My Website</h1>
        <p className="text-lg">A simple and stylish landing page with Clerk authentication.</p>
        <button className="text-black bg-white px-6 py-2 rounded-lg border-2 border-black hover:bg-gray-100">
          Get Started
        </button>
      </main>

      <footer className="absolute bottom-4 text-sm">
        <p>© 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
