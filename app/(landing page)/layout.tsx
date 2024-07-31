export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {children}
      </div>
      <div className="overflow-hidden bg-animation -z-[10]">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </div>
  );
}
