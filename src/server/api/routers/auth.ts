import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { User } from "next-auth";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        re_password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.password != input.re_password)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify({
            password: "passwords don't match",
            re_password: "passwords don't match",
          }),
        });
      const validEmail = await prisma?.user.findFirst({
        where: { email: input.email },
      });
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify({
          email: "this email is already been used",
        }),
      });
      const user = await prisma?.user.create({
        data: {
          email: input.email,
          name: input.email,
          password: await hash(input.password),
        },
      });
    }),
});
