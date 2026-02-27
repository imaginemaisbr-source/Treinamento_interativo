import { ModuleCard } from "@/components/ModuleCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { trainingModules } from "@/data/trainingModules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const architectureComponents = [
    {
      icon: BookOpen,
      title: "Ambiente Simulado",
      description: "Versões de teste dos sistemas NGWEB, VTAL e PSW com dados fictícios para prática segura"
    },
    {
      icon: Target,
      title: "Trilhas de Aprendizado",
      description: "Estruturadas e personalizadas que cobrem todas as funcionalidades críticas"
    },
    {
      icon: Zap,
      title: "Guias Interativos",
      description: "Walkthroughs embutidos com instruções passo a passo e feedback imediato"
    },
    {
      icon: Users,
      title: "Cenários Gamificados",
      description: "Missões e desafios simulando situações reais de atendimento"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Portal de Treinamento Interativo
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Aprenda a utilizar os sistemas essenciais para o atendimento ao cliente de forma prática, segura e envolvente.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/module/ngbilling">
              <Button className="bg-blue-600 hover:bg-blue-700">Explorar Módulos</Button>
            </Link>
            <Link href="/simuladores">
              <Button className="bg-purple-600 hover:bg-purple-700">Simuladores Interativos</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Ver Progresso</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Arquitetura do Treinamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureComponents.map((component, idx) => {
              const Icon = component.icon;
              return (
                <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">{component.title}</h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Módulos de Treinamento</h3>
        <p className="text-gray-600 mb-8">
          Escolha um módulo para começar seu treinamento. Cada módulo contém walkthroughs guiados e missões práticas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 border-y border-blue-200">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Benefícios do Treinamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prático e Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Pratique em um ambiente que simula a realidade, sem risco de impactar dados reais de clientes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Padronizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Todos os atendentes recebem o mesmo nível de conhecimento e seguem os mesmos procedimentos.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reduz Erros</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Prática exaustiva em cenários simulados resulta em significativa redução de erros em produção.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sempre Disponível</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Acesse o material de apoio a qualquer momento como referência rápida durante o trabalho.
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
