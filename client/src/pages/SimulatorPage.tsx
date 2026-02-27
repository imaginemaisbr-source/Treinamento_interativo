import { useRoute } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InteractiveSimulator } from "@/components/InteractiveSimulator";
import { getSimulatorFlow, simulatorFlows } from "@/data/systemSimulators";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function SimulatorPage() {
  const [match, params] = useRoute("/simulator/:id");

  if (!match) return null;

  const simulator = getSimulatorFlow(params.id);

  if (!simulator) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Simulador não encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">O simulador solicitado não existe.</p>
              <Link href="/simuladores">
                <Button>Voltar para Simuladores</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/simuladores">
            <Button variant="outline" className="mb-4">
              ← Voltar para Simuladores
            </Button>
          </Link>
        </div>

        <InteractiveSimulator flow={simulator} />

        {/* Simuladores Relacionados */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Outros Simuladores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simulatorFlows
              .filter(s => s.id !== simulator.id && s.system === simulator.system)
              .map(sim => (
                <Link key={sim.id} href={`/simulator/${sim.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{sim.name}</CardTitle>
                      <CardDescription>{sim.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{sim.objective}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">
                          {sim.screens.length} telas
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {sim.difficulty}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
