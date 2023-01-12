import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
export const todosRouter = createTRPCRouter({
  getInboxTodos: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        Inbox: {
          select: {
            todos: true,
          },
        },
        id: true,
      },
    });
    if (!user) return null;
    let inbox = user.Inbox;
    if (!inbox) {
      inbox = await ctx.prisma.inbox.create({
        data: {
          userId: user.id,
        },
        select: {
          todos: true,
        },
      });
      return inbox.todos;
    }
  }),
  getAllTodos: protectedProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        created: "asc",
      },
    });
    return todos;
  }),
  getAllTodosByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.projectId,
        },
      });
      if (!project) return null;
      const todos = await ctx.prisma.todo.findMany({
        where: {
          userId: ctx.session.user.id,
          projectId: project.id,
        },
        orderBy: {
          created: "asc",
        },
      });
      return todos;
    }),
  addTodo: protectedProcedure
    .input(
      z.object({
        body: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const todo = ctx.prisma.todo.create({
        data: {
          body: input.body,
          userId: ctx.session.user.id,
          done: false,
        },
      });
      return todo;
    }),
  addProjectTodo: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.projectId,
        },
      });
      console.log(project);
      if (!project) return null;
      const todo = ctx.prisma.todo.create({
        data: {
          body: input.body,
          projectId: project.id,
          userId: ctx.session.user.id,
          done: false,
        },
      });
      console.log(todo);
      return todo;
    }),
  removeTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const todo = await ctx.prisma.todo.deleteMany({
        where: {
          id: input.id,
          userId: user.id,
        },
      });
    }),
  markAsDone: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const todo = ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      });
      return todo;
    }),
});
