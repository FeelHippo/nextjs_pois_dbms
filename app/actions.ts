'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { GeocodeData } from "./interfaces/geocode";

const schema = z.object({
  place: z.string({
    message: 'Place is Required.'
  }),
});

export async function createPointOfInterest(
  geocoding: GeocodeData,
  _prevState: unknown,
  formData: FormData,
) {

  console.log('~~~ ', geocoding)
  const validatedFields = schema.safeParse({
    place: formData.get('place'),
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!geocoding) {
    return { message: 'Invalid Data' };
  }

  revalidatePath('/points-of-interest');
  redirect('/dashboard'); // /points-of-interest/new_id

}
