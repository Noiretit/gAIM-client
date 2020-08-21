import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { withAuth } from "../lib/AuthProvider";

function MarketplacePage() {
  return (
    <div>
      <h1>MARKETPLACE</h1>
      <p>Sell your games</p>
      <Link to={"/"}>
        <button className="navbar-button">Back home</button>
      </Link>

      <Navbar />
    </div>
  );
}

export default withAuth(MarketplacePage);
