export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="bg-sky-300 text-2xl text-black">Navigation Header</h1>
      {children}
      <h2 className="bg-blue-200 text-black">Footer</h2>
    </div>
  );
}
