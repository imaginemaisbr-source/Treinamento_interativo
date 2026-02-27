import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Module } from "@/data/trainingModules";
import * as Icons from "lucide-react";
import { Link } from "wouter";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  // Get icon component dynamically
  const IconComponent = Icons[module.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Link href={`/module/${module.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                {module.name}
              </CardTitle>
              <CardDescription className="mt-2">
                {module.objective}
              </CardDescription>
            </div>
            {IconComponent && (
              <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color} text-white ml-4`}>
                <IconComponent className="w-6 h-6" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Tópicos principais:</p>
              <div className="flex flex-wrap gap-2">
                {module.topics.slice(0, 3).map((topic, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {module.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{module.topics.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">{module.walkthroughs.length}</span> walkthroughs • 
                <span className="font-semibold ml-1">{module.missions.length}</span> missões
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
