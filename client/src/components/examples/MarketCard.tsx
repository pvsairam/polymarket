import MarketCard from "../MarketCard";

export default function MarketCardExample() {
  return (
    <div className="max-w-sm">
      <MarketCard
        id="1"
        title="Will Bitcoin reach $100k by end of 2025?"
        category="Crypto"
        currentPrice={67.5}
        priceChange24h={5.2}
        volume={45000}
        onClick={() => console.log("Market clicked")}
      />
    </div>
  );
}
