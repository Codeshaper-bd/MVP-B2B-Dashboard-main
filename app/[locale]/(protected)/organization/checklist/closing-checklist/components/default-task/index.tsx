"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import AutoLockForm from "./auto-lock-form";
import { tasks } from "./data";
import TaskCard from "../../../components/task-card";

function DefaultTask() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-6 text-lg font-semibold text-default-900">
          Default Task
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task, index) => (
            <div key={`task-${index}`}>
              <TaskCard {...task}>
                {task.hasManagedChecked && (
                  <div className="mt-4 flex items-center gap-4">
                    <Switch color="success" id={`manageSettings-${task?.id}`} />
                    <Label htmlFor={`manageSettings-${task?.id}`}>
                      Manage Settings
                    </Label>
                  </div>
                )}
              </TaskCard>
            </div>
          ))}
        </div>
        <div className="my-6">
          <h3 className="text-lg font-semibold text-default-900">
            Auto-Lock Settings
          </h3>
          <p className="text-sm text-default-600">
            Automate feature locks to streamline your closing process.
          </p>
        </div>
        <AutoLockForm />
      </CardContent>
    </Card>
  );
}

export default DefaultTask;
