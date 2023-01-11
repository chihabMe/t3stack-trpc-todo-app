import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectsRoutes = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    const projects = ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: {
            todos: true,
          },
        },
      },
    });
    return projects;
  }),
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const project = ctx.prisma.project.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
      return project;
    }),
});
