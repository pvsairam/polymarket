import { Heart } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="flex items-center gap-1" data-testid="text-footer-attribution">
              Built with <Heart className="w-4 h-4 text-destructive inline" /> by{" "}
              <a
                href="https://x.com/xtestnet"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors underline"
                data-testid="link-twitter"
              >
                xtestnet
              </a>
            </span>
            <span data-testid="text-footer-data-source">
              Powered by{" "}
              <a
                href="https://polymarket.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors underline"
                data-testid="link-polymarket"
              >
                Polymarket
              </a>
            </span>
          </div>
          <div className="text-xs text-center" data-testid="text-footer-copyright">
            © 2025 All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
