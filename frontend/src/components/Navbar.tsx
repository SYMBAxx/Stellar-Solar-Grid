import { Link } from "react-router-dom";
import { useWalletStore } from "../store/walletStore";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { address, connect, disconnect, error, clearError } = useWalletStore();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        ☀️ SolarGrid
      </Link>
      <div className={styles.links}>
        <Link to="/dashboard">My Meter</Link>
        <Link to="/pay">Pay</Link>
        <Link to="/provider">Provider</Link>
      </div>
      <div>
        {address ? (
          <div className={styles.wallet}>
            <span className={styles.addr}>
              {address.slice(0, 6)}…{address.slice(-4)}
            </span>
            <button className="btn-danger" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </div>
      {error && (
        <div className={styles.toast}>
          {error === "no_freighter" ? (
            <>
              Freighter wallet not found.{" "}
              <a
                href="https://freighter.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Freighter
              </a>
            </>
          ) : (
            "Wallet connection failed. Please try again."
          )}
          <button
            className={styles.toastClose}
            onClick={clearError}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </nav>
  );
}
