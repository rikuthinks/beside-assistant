"use client";

import { signOut } from "next-auth/react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-cyan-700 transition-all hover:bg-cyan-900 text-stone-300 font-bold text-sm py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
