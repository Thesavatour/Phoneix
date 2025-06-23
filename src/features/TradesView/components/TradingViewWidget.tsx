'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, memo } from 'react';

interface Props {
  crypto: CryptoView;
}

function TradingViewWidget({ crypto }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.log(`TradingViewWidget: ${crypto?.symbol?.toUpperCase()}`);
    const currentContainer = container.current;

    // Clean up the container before adding a new widget
    if (currentContainer) {
      currentContainer.innerHTML = '';
    }

    if (currentContainer) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol":  "BINANCE:${crypto?.symbol?.toUpperCase()}USDT",
          "interval": "240",
          "timezone": "Etc/UTC",
          "theme": "${resolvedTheme}",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "calendar": false,
          "studies": [
            "STD;24h%Volume"
          ],
          "support_host": "https://www.tradingview.com"
        }`;
      currentContainer.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [crypto?.symbol, resolvedTheme]);

  return (
    <div
      className="tradingview-widget-container h-[calc(100svh-300px)] md:h-full"
      ref={container}
      style={{  width: '100%' }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
