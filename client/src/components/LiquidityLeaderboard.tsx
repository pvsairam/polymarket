import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiX, SiTelegram } from "react-icons/si";

interface LeaderboardData {
  market: string;
  liquidity: number;
}

interface LiquidityLeaderboardProps {
  data: LeaderboardData[];
}

export default function LiquidityLeaderboard({ data }: LiquidityLeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="backdrop-blur-sm bg-card/80 border-card-border h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold" data-testid="text-leaderboard-title">
            Top Markets by Liquidity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}k`}
              />
              <YAxis
                type="category"
                dataKey="market"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--popover-border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value}k`, "Liquidity"]}
              />
              <Bar
                dataKey="liquidity"
                fill="hsl(var(--chart-2))"
                radius={[0, 4, 4, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Developer Contact Section */}
          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">
              For Ideas and Collab
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://x.com/xtestnet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-twitter"
              >
                <SiX className="w-3.5 h-3.5" />
                <span>@xtestnet</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://t.me/pvsairam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-telegram"
              >
                <SiTelegram className="w-3.5 h-3.5" />
                <span>@pvsairam</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
