import useTradePredictions from '@/hooks/useTradePredictions';
import MarketCard from './components/MarketCard';
import MarketSkeleton from './components/MarketSkeleton';

function Market() {
  const { data, isSuccess } = useTradePredictions({ page: 1 });
  return (
    <div className="w-full min-w-[312px]">
      <div className="relative">
        <div className="absolute top-[-54px] left-[-1px] z-50">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div className="block dark:hidden">
                <svg
                  width="147"
                  height="55"
                  viewBox="0 0 147 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2011_20093)">
                    <mask id="path-1-inside-1_2011_20093" fill="white">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.7227 0C8.78153 0 0.722656 8.05887 0.722656 18V50.7773C0.722656 52.1348 0.872923 53.4571 1.15773 54.7287C1.18877 54.8672 1.08417 55 0.942177 55C0.820939 55 0.722656 55.0983 0.722656 55.2195V449C0.722656 465.569 14.1541 479 30.7227 479H283.723C300.291 479 313.723 465.569 313.723 449V85C313.723 68.4315 300.291 55 283.723 55H146.828C142.121 55 138.678 50.3904 137.392 45.8618L128.088 13.0846C125.89 5.34242 118.82 0 110.772 0H18.7227Z"
                      />
                    </mask>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.7227 0C8.78153 0 0.722656 8.05887 0.722656 18V50.7773C0.722656 52.1348 0.872923 53.4571 1.15773 54.7287C1.18877 54.8672 1.08417 55 0.942177 55C0.820939 55 0.722656 55.0983 0.722656 55.2195V449C0.722656 465.569 14.1541 479 30.7227 479H283.723C300.291 479 313.723 465.569 313.723 449V85C313.723 68.4315 300.291 55 283.723 55H146.828C142.121 55 138.678 50.3904 137.392 45.8618L128.088 13.0846C125.89 5.34242 118.82 0 110.772 0H18.7227Z"
                      fill="white"
                    />
                    <path
                      d="M128.088 13.0846L129.05 12.8115V12.8115L128.088 13.0846ZM1.15773 54.7287L0.181909 54.9472L1.15773 54.7287ZM1.72266 18C1.72266 8.61115 9.33381 1 18.7227 1V-1C8.22925 -1 -0.277344 7.50658 -0.277344 18H1.72266ZM1.72266 50.7773V18H-0.277344V50.7773H1.72266ZM2.13355 54.5101C1.86471 53.3098 1.72266 52.0607 1.72266 50.7773H-0.277344C-0.277344 52.2088 -0.118861 53.6044 0.181909 54.9472L2.13355 54.5101ZM1.72266 449V55.2195H-0.277344V449H1.72266ZM283.723 478H30.7227V480H283.723V478ZM312.723 85V449H314.723V85H312.723ZM146.828 56H283.723V54H146.828V56ZM127.126 13.3576L136.43 46.1349L138.354 45.5888L129.05 12.8115L127.126 13.3576ZM110.772 1C118.373 1 125.05 6.04562 127.126 13.3576L129.05 12.8115C126.73 4.63922 119.267 -1 110.772 -1V1ZM18.7227 1H110.772V-1H18.7227V1ZM146.828 54C144.826 54 143.036 53.0241 141.557 51.4455C140.073 49.8623 138.961 47.7266 138.354 45.5888L136.43 46.1349C137.109 48.5257 138.36 50.9591 140.097 52.8128C141.838 54.6711 144.123 56 146.828 56V54ZM314.723 85C314.723 67.8792 300.844 54 283.723 54V56C299.739 56 312.723 68.9837 312.723 85H314.723ZM283.723 480C300.843 480 314.723 466.121 314.723 449H312.723C312.723 465.016 299.739 478 283.723 478V480ZM-0.277344 449C-0.277344 466.121 13.6018 480 30.7227 480V478C14.7064 478 1.72266 465.016 1.72266 449H-0.277344ZM0.942177 54C0.268682 54 -0.277344 54.546 -0.277344 55.2195H1.72266C1.72266 55.6506 1.3732 56 0.942177 56V54ZM0.181909 54.9472C0.0753965 54.4717 0.432656 54 0.942177 54V56C1.73569 56 2.30213 55.2628 2.13355 54.5101L0.181909 54.9472Z"
                      fill="#E4E4E2"
                      mask="url(#path-1-inside-1_2011_20093)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2011_20093">
                      <rect
                        width="146"
                        height="55"
                        fill="white"
                        transform="translate(0.722656)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="dark:block hidden">
                <svg
                  width="147"
                  height="55"
                  viewBox="0 0 147 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2011_20085)">
                    <mask id="path-1-inside-1_2011_20085" fill="white">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.7227 0C8.78153 0 0.722656 8.05887 0.722656 18V50.7773C0.722656 52.1348 0.872923 53.4571 1.15773 54.7287C1.18877 54.8672 1.08417 55 0.942177 55V55C0.820939 55 0.722656 55.0983 0.722656 55.2195V449C0.722656 465.569 14.1541 479 30.7227 479H283.723C300.291 479 313.723 465.569 313.723 449V85C313.723 68.4315 300.291 55 283.723 55H146.828C142.121 55 138.678 50.3904 137.392 45.8618V45.8618L128.088 13.0846C125.89 5.34242 118.82 0 110.772 0H18.7227Z"
                      />
                    </mask>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.7227 0C8.78153 0 0.722656 8.05887 0.722656 18V50.7773C0.722656 52.1348 0.872923 53.4571 1.15773 54.7287C1.18877 54.8672 1.08417 55 0.942177 55V55C0.820939 55 0.722656 55.0983 0.722656 55.2195V449C0.722656 465.569 14.1541 479 30.7227 479H283.723C300.291 479 313.723 465.569 313.723 449V85C313.723 68.4315 300.291 55 283.723 55H146.828C142.121 55 138.678 50.3904 137.392 45.8618V45.8618L128.088 13.0846C125.89 5.34242 118.82 0 110.772 0H18.7227Z"
                      fill="#222222"
                    />
                    <path
                      d="M128.088 13.0846L129.05 12.8115L129.05 12.8115L128.088 13.0846ZM1.15773 54.7287L0.181909 54.9472L1.15773 54.7287ZM1.72266 18C1.72266 8.61115 9.33381 1 18.7227 1V-1C8.22925 -1 -0.277344 7.50658 -0.277344 18H1.72266ZM1.72266 50.7773V18H-0.277344V50.7773H1.72266ZM2.13355 54.5101C1.86471 53.3098 1.72266 52.0607 1.72266 50.7773H-0.277344C-0.277344 52.2088 -0.118861 53.6044 0.181909 54.9472L2.13355 54.5101ZM1.72266 449V55.2195H-0.277344V449H1.72266ZM283.723 478H30.7227V480H283.723V478ZM312.723 85V449H314.723V85H312.723ZM146.828 56H283.723V54H146.828V56ZM127.126 13.3576L136.43 46.1349L138.354 45.5888L129.05 12.8115L127.126 13.3576ZM110.772 1C118.373 1 125.05 6.04562 127.126 13.3576L129.05 12.8115C126.73 4.63922 119.267 -1 110.772 -1V1ZM18.7227 1H110.772V-1H18.7227V1ZM146.828 54C144.826 54 143.036 53.0241 141.557 51.4455C140.073 49.8623 138.961 47.7266 138.354 45.5888L136.43 46.1349C137.109 48.5257 138.36 50.9591 140.097 52.8128C141.838 54.6711 144.123 56 146.828 56V54ZM314.723 85C314.723 67.8792 300.844 54 283.723 54V56C299.739 56 312.723 68.9837 312.723 85H314.723ZM283.723 480C300.843 480 314.723 466.121 314.723 449H312.723C312.723 465.016 299.739 478 283.723 478V480ZM-0.277344 449C-0.277344 466.121 13.6018 480 30.7227 480V478C14.7064 478 1.72266 465.016 1.72266 449H-0.277344ZM0.942177 54C0.268682 54 -0.277344 54.546 -0.277344 55.2195H1.72266C1.72266 55.6506 1.3732 56 0.942177 56V54ZM0.181909 54.9472C0.0753965 54.4717 0.432656 54 0.942177 54V56C1.73569 56 2.30213 55.2628 2.13355 54.5101L0.181909 54.9472Z"
                      fill="#313131"
                      mask="url(#path-1-inside-1_2011_20085)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2011_20085">
                      <rect
                        width="146"
                        height="55"
                        fill="white"
                        transform="translate(0.722656)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <span className="absolute dark:text-white text-lg left-8">
                Market
              </span>
            </div>
          </div>
        </div>

        <div className="dark:bg-[#222222] bg-white mt-14 p-4 border dark:border-[#313131] border-[#E4E4E2] rounded-tr-[30px] rounded-b-[30px] h-full">
          <div className="flex justify-between items-center mb-2">
            <p className="dark:text-[#D6D6D6] text-xs">Coin/24h Volume</p>
            <p className="dark:text-[#D6D6D6] text-xs">Price Cap</p>
          </div>
          {!isSuccess ? (
            <MarketSkeleton />
          ) : (
            <>
              {data?.crypto_currency
                .slice(0, 4)
                .map((item, index) => <MarketCard key={index} data={item} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Market;
