"use server";

import { Root } from "@/app/interfaces";
import { createPerson, deletePerson, updatePerson } from "@/lib/person-db";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new person.
 */
export async function createPersonAction({
  args,
  path,
}: {
  args: Root;
  path: string;
}) {
  await createPerson(args);
  revalidatePath(path);
}

/**
 * Server Action: Update an existing person.
 */
export async function updatePersonAction(
  id: string,
  update: Root,
  path: string
) {
  await updatePerson(id, update);
  revalidatePath(path);
}

/**
 * Server Action: Delete a person.
 */
export async function deletePersonAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deletePerson(id);
  revalidatePath(path);
}
