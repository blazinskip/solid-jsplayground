import { z } from "zod";
import { procedure, router, protectedProcedure } from "../utils";

export default router({
  hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return `Hello ${input.name}`;
  }),
  random: procedure
    .input(z.object({ num: z.number() }))
    .mutation(({ input }) => {
      return Math.floor(Math.random() * 100) / input.num;
    }),
  secret: protectedProcedure.query(({ ctx }) => {
    return `This is top secret - ${ctx.session.user.name}`;
  }),
  addNote: protectedProcedure
    .input(z.object({ note: z.string() }))
    .mutation(async ({ input }) => {
      console.log("call add Note");
      return prisma.note.create({
        data: { note: input.note },
        select: { note: true },
      });
    }),
  notes: protectedProcedure.query(async ({ ctx }) => {
    return prisma.note.findMany({ select: { note: true } });
  }),
});
