import styles from "./ProviderDashboard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockMeters = [
  { id: "METER1", owner: "GABC…1234", active: true, balance: 4.5, usage: 12.3 },
  { id: "METER2", owner: "GDEF…5678", active: false, balance: 0, usage: 8.1 },
  { id: "METER3", owner: "GHIJ…9012", active: true, balance: 2.1, usage: 5.7 },
  { id: "METER4", owner: "GKLM…3456", active: true, balance: 7.0, usage: 20.0 },
];

const revenueData = [
  { month: "Jan", xlm: 120 },
  { month: "Feb", xlm: 180 },
  { month: "Mar", xlm: 150 },
  { month: "Apr", xlm: 210 },
  { month: "May", xlm: 260 },
  { month: "Jun", xlm: 300 },
];

export default function ProviderDashboard() {
  const activeCount = mockMeters.filter((m) => m.active).length;
  const totalRevenue = revenueData.reduce((s, r) => s + r.xlm, 0);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Provider Dashboard</h1>

      <div className={styles.stats}>
        <div className="card">
          <p className={styles.label}>Total Meters</p>
          <p className={styles.value}>{mockMeters.length}</p>
        </div>
        <div className="card">
          <p className={styles.label}>Active Meters</p>
          <p className={`${styles.value} badge-active`}>{activeCount}</p>
        </div>
        <div className="card">
          <p className={styles.label}>Total Revenue</p>
          <p className={styles.value}>{totalRevenue} XLM</p>
        </div>
      </div>

      <div className={`card ${styles.chart}`}>
        <p className={styles.label}>Monthly Revenue (XLM)</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" stroke="#7a8fa6" />
            <YAxis stroke="#7a8fa6" />
            <Tooltip contentStyle={{ background: "#1c2b3a", border: "none" }} />
            <Bar dataKey="xlm" fill="#1a73e8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`card ${styles.tableWrap}`}>
        <p className={styles.label}>Meter Registry</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Meter ID</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Balance (XLM)</th>
              <th>Usage (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {mockMeters.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td className={styles.mono}>{m.owner}</td>
                <td>
                  <span className={m.active ? "badge-active" : "badge-inactive"}>
                    {m.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{m.balance}</td>
                <td>{m.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
