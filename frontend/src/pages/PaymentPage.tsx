import { useState } from "react";
import { useWalletStore } from "../store/walletStore";
import { contractInvoke } from "../lib/contract";
import * as StellarSdk from "@stellar/stellar-sdk";
import styles from "./PaymentPage.module.css";

const PLANS = ["Daily", "Weekly", "UsageBased"] as const;
type Plan = (typeof PLANS)[number];

const PLAN_PRICES: Record<Plan, number> = {
  Daily: 0.5,
  Weekly: 3.0,
  UsageBased: 1.0,
};

export default function PaymentPage() {
  const { address } = useWalletStore();
  const [meterId, setMeterId] = useState("");
  const [plan, setPlan] = useState<Plan>("Daily");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const amount = PLAN_PRICES[plan];

  const handlePay = async () => {
    if (!address || !meterId) return;
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      const amountStroops = BigInt(Math.round(amount * 10_000_000));
      const hash = await contractInvoke(address, "make_payment", [
        StellarSdk.nativeToScVal(meterId, { type: "symbol" }),
        StellarSdk.nativeToScVal(address, { type: "address" }),
        StellarSdk.nativeToScVal(amountStroops, { type: "i128" }),
        StellarSdk.nativeToScVal(plan, { type: "symbol" }),
      ]);
      setTxHash(hash);
    } catch (err: any) {
      setError(err.message ?? "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className={styles.empty}>Connect your wallet to make a payment.</div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Top Up Energy</h1>

      <div className={`card ${styles.form}`}>
        <label className={styles.label}>Meter ID</label>
        <input
          className={styles.input}
          placeholder="e.g. METER1"
          value={meterId}
          onChange={(e) => setMeterId(e.target.value)}
        />

        <label className={styles.label}>Payment Plan</label>
        <div className={styles.plans}>
          {PLANS.map((p) => (
            <button
              key={p}
              className={`${styles.planBtn} ${plan === p ? styles.selected : ""}`}
              onClick={() => setPlan(p)}
            >
              <span>{p}</span>
              <span className={styles.price}>{PLAN_PRICES[p]} XLM</span>
            </button>
          ))}
        </div>

        <div className={styles.summary}>
          You will pay <strong>{amount} XLM</strong> for {plan.toLowerCase()} access.
        </div>

        <button
          className="btn-primary"
          onClick={handlePay}
          disabled={loading || !meterId}
          style={{ width: "100%", marginTop: 8 }}
        >
          {loading ? "Processing…" : `Pay ${amount} XLM`}
        </button>

        {txHash && (
          <p className={styles.success}>
            ✅ Payment sent!{" "}
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Explorer
            </a>
          </p>
        )}
        {error && <p className={styles.error}>❌ {error}</p>}
      </div>
    </div>
  );
}
