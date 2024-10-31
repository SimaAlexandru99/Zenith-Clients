// MainContent.tsx

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex flex-col flex-1 gap-4 p-4 pt-0">
        {children}
      </main>
    )
  }
  