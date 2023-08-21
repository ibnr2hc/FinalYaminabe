import RandomRoleSavageRaidForm from './components/randomrole/savageraid/form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-200 justify-center">
      {/* Title */}
      <div className="flex pb-10">
        <span className="text-3xl font-bold text-slate-700">FINAL YAMINABE</span>
      </div>
      <div className="flex items-center justify-center shadow-md container w-full rounded bg-slate-50 py-8">
        {/* RandomRole */}
        <RandomRoleSavageRaidForm />
      </div>
    </main>
  )
}
