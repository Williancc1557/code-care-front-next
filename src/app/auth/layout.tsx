import { LeftAuthSide } from "./_components/LeftAuthSide";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen justify-center">
      <LeftAuthSide />
      {children}
    </div>
  );
}
