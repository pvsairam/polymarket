import LiveDataBadge from "../LiveDataBadge";

export default function LiveDataBadgeExample() {
  return <LiveDataBadge lastUpdate={new Date(Date.now() - 15000)} />;
}
