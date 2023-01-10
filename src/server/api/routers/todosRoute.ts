import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
export const todosRouter = createTRPCRouter({
  getAllTodos: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) return [];
    const user = ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user.Todos();
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
