import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import SessionWrapper from "@/components/utils/SessionProvider";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata = {
  title: "MAPC | Demo",
  description:
    "Showcasing my skills by integrating Mapbox, D3.js, and Airtable for an upcoming interview.",
  metadataBase: new URL("https://mapc-review.vercel.app/"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
            type="text/css"
          />
        </head>
        <body className={cx(sfPro.variable, inter.variable)}>
          <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="flex min-h-[calc(100vh-120px)] w-full flex-col items-center  pt-[120px]">
            {children}
          </main>
          <Footer />
          <VercelAnalytics />
        </body>
      </html>
    </SessionWrapper>
  );
}
