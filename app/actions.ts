'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { GeocodeData } from './interfaces/geocode';
import DB from './data/storage';
import { pointsOfInterest } from './data/schema';
import { eq } from "drizzle-orm";

const schema = z.object({
  place: z.string({
    message: 'Place is Required.'
  }),
  placeId: z.string(),
  formattedAddress: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: z.string(),
});

export async function createPointOfInterest(
  geocoding: GeocodeData,
  _prevState: unknown,
  formData: FormData,
) {

  const {
    placeId,
    formattedAddress,
    lat,
    lng,
    type,
  } = geocoding;
  const validatedFields = schema.safeParse({
    place: formData.get('place'),
    placeId,
    formattedAddress,
    lat,
    lng,
    type,
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!geocoding) {
    return { message: 'Invalid Data' };
  }

  try {

    await DB.insert(pointsOfInterest).values({
      placeId,
      formattedAddress,
      location: [lat, lng],
      type,
    });

  } catch {
    return { message: 'Could not create' };
  }

  revalidatePath('/points-of-interest');
  redirect('/points-of-interest');

}

export async function readAllPointsOfInterest(): Promise<GeocodeData[]> {

  return (
    await DB.select().from(pointsOfInterest)
  ).map(
    ({ placeId, formattedAddress, location: [ lat, lng ], type }) =>
      ({
        placeId,
        formattedAddress,
        lat,
        lng,
        type,
      } as GeocodeData),
  );

}

export async function deletePointOfInterest(placeid: string): Promise<void> {
  await DB.delete(pointsOfInterest).where(eq(pointsOfInterest.placeId, placeid));
}
