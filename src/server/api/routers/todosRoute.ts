import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
export const todosRouter = createTRPCRouter({
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
  removeTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;
      const todo = ctx.prisma.todo.deleteMany({
        where: {
          id: input.id,
          userId: user.id,
        },
      });
      return todo;
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
