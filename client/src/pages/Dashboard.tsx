import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { trainingModules } from "@/data/trainingModules";
import { TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { Link } from "wouter";
import * as Icons from "lucide-react";

export default function Dashboard() {
  // Simulated progress data
  const userProgress = {
    name: "João Silva",
    email: "joao.silva@ligga.com.br",
    startDate: "2026-02-25",
    totalProgress: 35,
    modules: [
      { id: "ng-billing", progress: 45, completed: false, missionsCompleted: 1, totalMissions: 2 },
      { id: "vtal", progress: 30, completed: false, missionsCompleted: 0, totalMissions: 2 },
      { id: "psw", progress: 30, completed: false, missionsCompleted: 1, totalMissions: 2 }
    ]
  };

  const getModuleData = (moduleId: string) => {
    return trainingModules.find(m => m.id === moduleId);
  };

  const getModuleProgress = (moduleId: string) => {
    return userProgress.modules.find(m => m.id === moduleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* User Profile Section */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{userProgress.name}</CardTitle>
                <CardDescription>{userProgress.email}</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800">Em Progresso</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Data de Início</p>
                <p className="text-lg font-semibold">{new Date(userProgress.startDate).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Progresso Total</p>
                <p className="text-lg font-semibold">{userProgress.totalProgress}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Missões Concluídas</p>
                <p className="text-lg font-semibold">
                  {userProgress.modules.reduce((sum, m) => sum + m.missionsCompleted, 0)} / {userProgress.modules.reduce((sum, m) => sum + m.totalMissions, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Overall Progress */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <CardTitle>Progresso Geral</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conclusão do Treinamento</span>
                <span className="text-sm font-bold">{userProgress.totalProgress}%</span>
              </div>
              <Progress value={userProgress.totalProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Module Progress */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Progresso por Módulo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainingModules.map((module) => {
            const moduleProgress = getModuleProgress(module.id);
            const IconComponent = Icons[module.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

            return (
              <Link key={module.id} href={`/module/${module.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                      </div>
                      {IconComponent && (
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progresso</span>
                          <span className="text-sm font-bold">{moduleProgress?.progress}%</span>
                        </div>
                        <Progress value={moduleProgress?.progress || 0} className="h-2" />
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">
                            {moduleProgress?.missionsCompleted} de {moduleProgress?.totalMissions} missões
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">
                            {module.walkthroughs.length} walkthroughs
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                        {moduleProgress?.progress === 100 ? "Revisitar" : "Continuar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
            <CardDescription>Desbloqueie conquistas ao completar módulos e missões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🚀", label: "Primeiros Passos", unlocked: true },
                { icon: "📚", label: "Estudioso", unlocked: true },
                { icon: "🎯", label: "Missionário", unlocked: false },
                { icon: "⭐", label: "Mestre", unlocked: false }
              ].map((achievement, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    achievement.unlocked
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-sm font-semibold">{achievement.label}</p>
                  {!achievement.unlocked && (
                    <p className="text-xs text-gray-500 mt-1">Bloqueado</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recommendations */}
      <section className="bg-blue-50 py-12 border-y border-blue-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Passos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Continuar com V.tal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Você completou 45% do módulo NG Billing. Continue com o módulo V.tal para aprender sobre gerenciamento de ordens de serviço.
                </p>
                <Link href="/module/vtal">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Iniciar V.tal
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revisitar NG Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Complete a missão de Negociação de Débito para aprofundar seu conhecimento em procedimentos financeiros.
                </p>
                <Link href="/module/ng-billing">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Voltar para NG Billing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
