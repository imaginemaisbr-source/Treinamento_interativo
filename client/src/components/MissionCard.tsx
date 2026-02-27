import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mission } from "@/data/trainingModules";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";

interface MissionCardProps {
  mission: Mission;
}

const difficultyConfig = {
  easy: { label: "Fácil", color: "bg-green-100 text-green-800", icon: "🟢" },
  medium: { label: "Médio", color: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  hard: { label: "Difícil", color: "bg-red-100 text-red-800", icon: "🔴" }
};

export function MissionCard({ mission }: MissionCardProps) {
  const [completed, setCompleted] = useState(false);
  const config = difficultyConfig[mission.difficulty];

  return (
    <Card className={`hover:shadow-md transition-all ${completed ? "bg-green-50 border-green-200" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{mission.title}</CardTitle>
              <Badge className={config.color}>{config.label}</Badge>
            </div>
            <CardDescription className="mt-2">
              {mission.objective}
            </CardDescription>
          </div>
          {completed && (
            <CheckCircle2 className="w-6 h-6 text-green-600 ml-2 flex-shrink-0" />
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm font-semibold text-gray-700">Critério de Sucesso:</p>
            </div>
            <p className="text-sm text-gray-600 ml-6">{mission.successCriteria}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-semibold text-gray-700">Critério de Falha:</p>
            </div>
            <p className="text-sm text-gray-600 ml-6">{mission.failureCriteria}</p>
          </div>

          <button
            onClick={() => setCompleted(!completed)}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              completed
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Zap className="w-4 h-4" />
            {completed ? "✓ Missão Concluída" : "Iniciar Missão"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
