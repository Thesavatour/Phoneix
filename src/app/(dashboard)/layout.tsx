import { ThemeProviders } from '@/components/Provider/NextThemeProvider';
import { Header } from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { UserProvider } from '@/components/Provider/UserProvider';
import ReactQueryProvider from '@/components/Provider/ReactQueryProvider';

import '../globals.css';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#F9F9F9] dark:bg-[#000] font-outfit overflow-x-hidden">
        <ReactQueryProvider>
          <ThemeProviders>
            <div className="h-screen flex flex-col justify-between">
              <UserProvider>
                <Header />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="md:ml-[86px] mt-[78px] pt-6 pr-6 pl-6 md:pl-0 flex-1 pb-6">
                    {children}
                  </main>
                </div>
                <Footer />
              </UserProvider>
            </div>
          </ThemeProviders>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
