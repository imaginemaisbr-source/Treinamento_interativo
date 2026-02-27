import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { simulatorFlows, getSimulatorsBySystem } from "@/data/systemSimulators";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Monitor, Zap } from "lucide-react";

export default function SimulatorsPage() {
  const ngBillingSimulators = getSimulatorsBySystem("ngbilling");
  const vtalSimulators = getSimulatorsBySystem("vtal");
  const pswSimulators = getSimulatorsBySystem("psw");

  const systemGroups = [
    {
      name: "NG Billing (NGWEB)",
      icon: Monitor,
      color: "from-blue-500 to-blue-600",
      simulators: ngBillingSimulators
    },
    {
      name: "Portal Operacional VTAL",
      icon: Monitor,
      color: "from-green-500 to-green-600",
      simulators: vtalSimulators
    },
    {
      name: "PSW (Atendimento)",
      icon: Monitor,
      color: "from-purple-500 to-purple-600",
      simulators: pswSimulators
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Simuladores Interativos
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Navegue pelos sistemas reais de forma segura e interativa. Clique nos elementos da tela para aprender o passo a passo de cada funcionalidade.
          </p>
        </div>
      </section>

      {/* Systems */}
      <section className="container mx-auto px-4 py-8 space-y-12">
        {systemGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.name}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${group.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
                <Badge variant="secondary">{group.simulators.length} simuladores</Badge>
              </div>

              {group.simulators.length === 0 ? (
                <Card className="bg-gray-50">
                  <CardContent className="pt-6 text-center text-gray-600">
                    <p>Nenhum simulador disponível para este sistema ainda.</p>
                    <p className="text-sm mt-2">Mais simuladores em breve!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.simulators.map((simulator) => (
                    <Card key={simulator.id} className="hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{simulator.name}</CardTitle>
                        <CardDescription>{simulator.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Objetivo:</span> {simulator.objective}
                        </p>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Passos:</p>
                          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                            {simulator.steps.slice(0, 3).map((step, idx) => (
                              <li key={idx} className="truncate">{step}</li>
                            ))}
                            {simulator.steps.length > 3 && (
                              <li className="text-gray-500">+{simulator.steps.length - 3} mais</li>
                            )}
                          </ol>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex gap-2">
                            <Badge variant="outline">{simulator.screens.length} telas</Badge>
                            <Badge className={`${
                              simulator.difficulty === "easy" ? "bg-green-100 text-green-800" :
                              simulator.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {simulator.difficulty}
                            </Badge>
                          </div>
                        </div>

                        <Link href={`/simulator/${simulator.id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            Iniciar Simulador
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Info Section */}
      <section className="bg-blue-50 py-12 border-y border-blue-200 mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Como Usar os Simuladores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Leia as Instruções</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Cada tela contém instruções sobre o que fazer. Siga-as passo a passo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Clique nos Elementos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Passe o mouse sobre a tela para revelar os elementos clicáveis (hotspots).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Complete a Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Navegue por todas as telas e complete todos os passos para dominar a funcionalidade.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
