import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWalletStore } from "../store/walletStore";
import styles from "./UserDashboard.module.css";

// Mock usage data — replace with real contract/API calls
const mockUsage = [
  { day: "Mon", kWh: 1.2 },
  { day: "Tue", kWh: 0.9 },
  { day: "Wed", kWh: 1.5 },
  { day: "Thu", kWh: 1.1 },
  { day: "Fri", kWh: 1.8 },
  { day: "Sat", kWh: 2.0 },
  { day: "Sun", kWh: 0.7 },
];

interface MeterStatus {
  active: boolean;
  balance: number; // XLM
  unitsUsed: number; // kWh
  plan: string;
}

export default function UserDashboard() {
  const { address } = useWalletStore();
  const [meter, setMeter] = useState<MeterStatus | null>(null);

  useEffect(() => {
    if (!address) return;
    // TODO: fetch from contract via contractQuery("get_meter", [...])
    // Using mock data for now
    setMeter({
      active: true,
      balance: 4.5,
      unitsUsed: 12.3,
      plan: "Daily",
    });
  }, [address]);

  if (!address) {
    return (
      <div className={styles.empty}>
        Connect your wallet to view your meter dashboard.
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Meter</h1>

      {meter && (
        <>
          <div className={styles.stats}>
            <div className="card">
              <p className={styles.label}>Status</p>
              <p className={meter.active ? "badge-active" : "badge-inactive"}>
                {meter.active ? "● Active" : "● Inactive"}
              </p>
            </div>
            <div className="card">
              <p className={styles.label}>Balance</p>
              <p className={styles.value}>{meter.balance} XLM</p>
            </div>
            <div className="card">
              <p className={styles.label}>Total Used</p>
              <p className={styles.value}>{meter.unitsUsed} kWh</p>
            </div>
            <div className="card">
              <p className={styles.label}>Plan</p>
              <p className={styles.value}>{meter.plan}</p>
            </div>
          </div>

          <div className={`card ${styles.chart}`}>
            <p className={styles.label}>Usage This Week</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mockUsage}>
                <XAxis dataKey="day" stroke="#7a8fa6" />
                <YAxis stroke="#7a8fa6" unit=" kWh" />
                <Tooltip
                  contentStyle={{ background: "#1c2b3a", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="kWh"
                  stroke="#f5a623"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
