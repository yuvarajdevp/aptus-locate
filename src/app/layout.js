// Layout.js
import "@/app/globals.css";
import QueryProvider from "@/provider/QueryProvider";

export const metadata = {
  title: "Aptus Housing Loan- Easy Home Loan Finance Company",
  description: "Aptus Housing Finance Company is your one-stop solution for your long-awaited dream home. We offer you an easy financial solution for your dream home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
     <main>{children}</main>
        </QueryProvider>

      </body>
    </html>
  );
}
