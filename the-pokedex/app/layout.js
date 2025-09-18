import "./globals.css";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Your Pokedex",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewpoint"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body>
        <Header />
        <main >{children}</main>
      </body>
    </html>
  );
}
