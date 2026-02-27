import { useRoute } from "wouter";
import { trainingModules } from "@/data/trainingModules";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WalkthroughCard } from "@/components/WalkthroughCard";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Zap } from "lucide-react";
import { Link } from "wouter";
import * as Icons from "lucide-react";

export default function ModulePage() {
  const [match, params] = useRoute("/module/:id");
  
  if (!match) return null;

  const module = trainingModules.find(m => m.id === params.id);

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Módulo não encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">O módulo solicitado não existe.</p>
              <Link href="/">
                <Button>Voltar para Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = Icons[module.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Module Header */}
      <section className={`bg-gradient-to-r ${module.color} text-white py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-4">
            {IconComponent && <IconComponent className="w-12 h-12" />}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{module.name}</h1>
              <p className="text-lg opacity-90">{module.objective}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Module Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {module.topics.length}
                </div>
                <p className="text-gray-600">Tópicos Principais</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {module.walkthroughs.length}
                </div>
                <p className="text-gray-600">Walkthroughs Guiados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {module.missions.length}
                </div>
                <p className="text-gray-600">Missões Práticas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Tópicos do Módulo</CardTitle>
            <CardDescription>
              Conteúdo que será abordado neste módulo de treinamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Walkthroughs Section */}
      <section className="bg-blue-50 py-12 border-y border-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Guias Interativos (Walkthroughs)</h2>
          </div>
          <p className="text-gray-600 mb-8">
            Siga os passos detalhados para aprender a usar cada funcionalidade do sistema.
          </p>
          <div className="space-y-4">
            {module.walkthroughs.map((walkthrough) => (
              <WalkthroughCard key={walkthrough.id} walkthrough={walkthrough} />
            ))}
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Missões Gamificadas</h2>
        </div>
        <p className="text-gray-600 mb-8">
          Pratique em cenários reais. Complete as missões e ganhe experiência!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {module.missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
          <p className="mb-6 text-lg opacity-90">
            Explore os walkthroughs e complete as missões para dominar este módulo.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Acompanhar Progresso
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
