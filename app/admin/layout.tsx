export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body { overflow: auto !important; position: static !important; inset: unset !important; background: #f9fafb !important; }`}</style>
      <div className="min-h-screen bg-gray-50 font-sans">
        {children}
      </div>
    </>
  );
}
