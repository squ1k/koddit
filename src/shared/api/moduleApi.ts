import { modules } from "@/entities/courseModule/model/courseModules"
import delay from "./delay"

export function getModulesByCourse(courseId: string) {
  return modules.filter(m => m.courseId === courseId)
}

export async function createModule(courseId: string, moduleData: {
  title: string;
  order: number;
  annotation?: string;
}): Promise<{ success: boolean; moduleId: string; message: string }> {
  await delay(500);

  // Backend integration: Create new course module in database
  // const response = await fetch(`/api/courses/${courseId}/modules`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(moduleData)
  // });

  return {
    success: true,
    moduleId: `m${Date.now()}`,
    message: "Модуль успешно создан"
  };
}

export async function updateModule(moduleId: string, moduleData: any): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Update module information on server
  // const response = await fetch(`/api/modules/${moduleId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(moduleData)
  // });

  return { success: true, message: "Модуль успешно обновлен" };
}

export async function deleteModule(moduleId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Delete module from server database
  // const response = await fetch(`/api/modules/${moduleId}`, {
  //   method: 'DELETE',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: "Модуль успешно удален" };
}