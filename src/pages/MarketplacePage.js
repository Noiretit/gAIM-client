import React from "react";
import Navbar from "../components/navbar/Navbar";
import { withAuth } from "../lib/AuthProvider";

function MarketplacePage() {
  return (
    <div>
      <h1>MARKETPLACE</h1>
      <p>Sell your games</p>

      <Navbar />
    </div>
  );
}

export default withAuth(MarketplacePage);
