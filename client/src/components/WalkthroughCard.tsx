import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Walkthrough } from "@/data/trainingModules";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface WalkthroughCardProps {
  walkthrough: Walkthrough;
}

export function WalkthroughCard({ walkthrough }: WalkthroughCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{walkthrough.title}</CardTitle>
            <CardDescription className="mt-2">
              {walkthrough.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2 whitespace-nowrap">
            {walkthrough.steps.length} passos
          </Badge>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent>
          <div className="space-y-3">
            {walkthrough.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <div className="px-6 py-3 border-t">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {expanded ? "Ocultar passos" : "Ver passos"}
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </div>
    </Card>
  );
}
