import { useState, useRef } from "react";
import { SimulatorFlow, SimulatorScreen, Hotspot } from "@/data/systemSimulators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface InteractiveSimulatorProps {
  flow: SimulatorFlow;
}

export function InteractiveSimulator({ flow }: InteractiveSimulatorProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [completedHotspots, setCompletedHotspots] = useState<Set<string>>(new Set());
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentScreen = flow.screens[currentScreenIndex];
  const isLastScreen = currentScreenIndex === flow.screens.length - 1;
  const isFirstScreen = currentScreenIndex === 0;

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.action === "input") {
      setFeedback({
        type: "info",
        message: `Campo de entrada: ${hotspot.description || hotspot.label}`
      });
      return;
    }

    if (hotspot.action === "click" || hotspot.action === "navigate") {
      setCompletedHotspots(prev => new Set(Array.from(prev).concat([hotspot.id])));
      
      if (hotspot.nextScreen) {
        const nextIndex = flow.screens.findIndex(s => s.id === hotspot.nextScreen);
        if (nextIndex !== -1) {
          setCurrentScreenIndex(nextIndex);
          setFeedback({
            type: "success",
            message: `✓ ${hotspot.label} clicado com sucesso!`
          });
        }
      } else {
        setFeedback({
          type: "info",
          message: `${hotspot.label}: ${hotspot.description || ""}`
        });
      }
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleInputSubmit = (hotspot: Hotspot) => {
    if (!hotspot.inputField || !hotspot.expectedValue) return;

    const value = inputValues[hotspot.inputField] || "";
    if (value.toUpperCase().includes(hotspot.expectedValue.toUpperCase())) {
      setCompletedHotspots(prev => new Set(Array.from(prev).concat([hotspot.id])));
      setFeedback({
        type: "success",
        message: `✓ Entrada correta: "${value}"`
      });
    } else {
      setFeedback({
        type: "error",
        message: `✗ Valor esperado contém: "${hotspot.expectedValue}"`
      });
    }
  };

  const progressPercentage = Math.round(((currentScreenIndex + 1) / flow.screens.length) * 100);
  const allHotspotsCompleted = currentScreen.hotspots.every(h => {
    const hotspotsArray = Array.from(completedHotspots);
    return hotspotsArray.includes(h.id);
  });

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle>{flow.name}</CardTitle>
              <CardDescription>{flow.description}</CardDescription>
            </div>
            <Badge className="ml-2">{flow.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Objetivo: {flow.objective}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              Tela {currentScreenIndex + 1} de {flow.screens.length}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {feedback && (
        <Card className={`border-l-4 ${
          feedback.type === "success" ? "border-l-green-500 bg-green-50" :
          feedback.type === "error" ? "border-l-red-500 bg-red-50" :
          "border-l-blue-500 bg-blue-50"
        }`}>
          <CardContent className="pt-4 flex items-start gap-2">
            {feedback.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
            {feedback.type === "error" && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
            {feedback.type === "info" && <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
            <p className="text-sm">{feedback.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Screen */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{currentScreen.name}</CardTitle>
              <CardDescription>{currentScreen.description}</CardDescription>
            </div>
            {currentScreen.instructions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-xs">
                <p className="text-sm font-semibold text-blue-900">💡 {currentScreen.instructions}</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" ref={imageRef}>
            {/* Imagem de fundo */}
            <img
              src={currentScreen.imageUrl}
              alt={currentScreen.name}
              className="w-full h-auto block"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23f0f0f0' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EImagem não disponível%3C/text%3E%3C/svg%3E";
              }}
            />

            {/* Hotspots */}
            <div className="absolute inset-0">
              {currentScreen.hotspots.map((hotspot) => {
                const isCompleted = completedHotspots.has(hotspot.id);
                return (
                  <div
                    key={hotspot.id}
                    className={`absolute cursor-pointer transition-all group ${
                      isCompleted ? "opacity-60" : "opacity-0 hover:opacity-100"
                    }`}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      width: `${hotspot.width}%`,
                      height: `${hotspot.height}%`
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                  >
                    {/* Borda do hotspot */}
                    <div className={`w-full h-full border-2 rounded ${
                      isCompleted ? "border-green-500 bg-green-100/20" : "border-blue-500 bg-blue-100/20"
                    }`}>
                      {/* Label */}
                      <div className="absolute -top-8 left-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {hotspot.label}
                        {isCompleted && " ✓"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input Fields */}
          <div className="mt-4 space-y-3">
            {currentScreen.hotspots
              .filter(h => h.action === "input")
              .map(hotspot => (
                <div key={hotspot.id} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={hotspot.description || hotspot.label}
                    value={inputValues[hotspot.inputField || ""] || ""}
                    onChange={(e) => handleInputChange(hotspot.inputField || "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleInputSubmit(hotspot)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    OK
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          disabled={isFirstScreen}
          onClick={() => {
            setCurrentScreenIndex(prev => Math.max(0, prev - 1));
            setFeedback(null);
          }}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {flow.screens.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentScreenIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentScreenIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              title={`Tela ${idx + 1}`}
            />
          ))}
        </div>

        <Button
          disabled={isLastScreen}
          onClick={() => {
            setCurrentScreenIndex(prev => Math.min(flow.screens.length - 1, prev + 1));
            setFeedback(null);
          }}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          Próximo
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Completion Message */}
      {isLastScreen && allHotspotsCompleted && currentScreen.successMessage && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">{currentScreen.successMessage}</p>
              <p className="text-sm text-green-700 mt-1">Você completou este simulador com sucesso!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
