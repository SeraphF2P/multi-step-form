import "./globals.css";

export const metadata = {
  title: "multi step form",
  description: "front-end challange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-neutral-LightGray min-h-screen">{children}</body>
    </html>
  );
}
