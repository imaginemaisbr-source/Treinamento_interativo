export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white mb-1">&copy; 2026 LIGGA Telecon</p>
            <p className="text-xs">Todos os direitos reservados.</p>
          </div>
          <p className="text-sm">Portal de Treinamento Interativo v1.0</p>
        </div>
      </div>
    </footer>
  );
}
