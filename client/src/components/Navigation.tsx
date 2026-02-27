import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              LT
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">LIGGA Telecon</h1>
              <p className="text-xs text-gray-500">Portal de Treinamento</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="hover:bg-blue-50">
            Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
}
