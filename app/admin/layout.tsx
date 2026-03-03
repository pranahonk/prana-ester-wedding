export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" style={{ overflow: "auto", position: "static" }}>
      {children}
    </div>
  );
}
