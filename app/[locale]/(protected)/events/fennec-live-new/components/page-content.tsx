import ActiveLiveSessions from "./active-live-session";
import LiveHistory from "./live-history";

export default function PageContent() {
  return (
    <div className="mt-6 space-y-8">
      <ActiveLiveSessions />
      <LiveHistory />
    </div>
  );
}
