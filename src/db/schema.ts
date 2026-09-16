import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";



export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
    name: text('name').notNull().unique(),
});

export const feed = pgTable('feed', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
    name: text('name').notNull(),
    url: text('url').notNull().unique(),
    userId: uuid('user_id').notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
});


export type User = typeof users.$inferSelect;
export type Feed = typeof feed.$inferSelect;