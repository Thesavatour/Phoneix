import ReactQueryProvider from '@/components/Provider/ReactQueryProvider';
import GlobalSettingsProvider from '@/components/Provider/GlobalSettingsProvider';
import { ThemeProviders } from '@/components/Provider/NextThemeProvider';

import '../globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#F9F9F9] dark:bg-[#000] font-outfit">
        <ReactQueryProvider>
          <ThemeProviders>
            <GlobalSettingsProvider>
              <div className="dark:bg-auth-background bg-fixed bg-repeat bg-cover">
                <div className="flex justify-center items-center mx-auto relative">
                  <div className="hidden dark:block blockrounded-[1000px] bg-[rgba(223,255,69,0.7)] blur-[200px] max-w-[1000px] w-full h-[200px] flex-shrink-0 mx-auto absolute inset-x-0 top-[-132px]"></div>
                </div>

                <div className="flex-grow flex justify-center items-center min-h-screen">
                  {children}
                </div>
              </div>
            </GlobalSettingsProvider>
          </ThemeProviders>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
