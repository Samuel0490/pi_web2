// src/app/layout.tsx
export const metadata = {
  title: "Mi App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Links a CSS dentro de public/css */}
        <link rel="stylesheet" href="/css/login.css" />
        <link rel="stylesheet" href="/css/register.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
