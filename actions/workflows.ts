"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/lib/types";
import {
  createWorkflowShema,
  createWorkflowShemaType,
} from "@/schema/workflows";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getWorkflowsForUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unatuthenticated");
  }
  return prisma.workflow.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createWorkflow(form: createWorkflowShemaType) {
  const { success, data } = createWorkflowShema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("unatuthenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
