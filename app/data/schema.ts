import { pgTable, point, varchar, timestamp } from 'drizzle-orm/pg-core';

export const pointsOfInterest = pgTable(
  'points-of-interest',
  {
    timestamp: timestamp('timestamp1').notNull().defaultNow(),
    placeId: varchar().notNull().unique(),
    formattedAddress: varchar().notNull(),
    location: point(
      'location',
      {
        mode: 'tuple'
      },
    ).notNull(),
    type: varchar(),
  },
);
