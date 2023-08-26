import { Person } from "@/models/Person";
import { Root } from "@/app/interfaces";

import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

interface PersonFilter {
  page?: number;
  limit?: number;
}

export async function getPersons(filter: PersonFilter = {}) {
  try {
    await connectDB();

    // const page = filter.page ?? 1;
    // const limit = filter.limit ?? 10;
    // const skip = (page - 1) * limit;

    // const persons = await Person.find().skip(skip).limit(limit).lean().exec();
    const persons = await Person.find().lean().exec();
    const results = persons.length;

    return {
      persons,
      // page,
      // limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createPerson(args: Root) {
  try {
    await connectDB();
    const person = await Person.create(args);

    return {
      person,
    };
  } catch (error) {
    return { error };
  }
}

export async function getPerson(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Person not found" };
    }
    const person = await Person.findById(parsedId).lean().exec();
    if (person) {
      return {
        person,
      };
    } else {
      return { error: "Person not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updatePerson(id: string, args: Root) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: 'Person not found' };
    }

    const person = await Person.findByIdAndUpdate(parsedId, args, { new: true })
      .lean()
      .exec();

    if (person) {
      return {
        person,
      };
    } else {
      return { error: 'Person not found' };
    }
  } catch (error) {
    return { error };
  }
}

export async function deletePerson(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) return { error: "Person not found" };

    const person = await Person.findByIdAndDelete(parsedId).exec();

    if (person) {
      return { id };
    } else {
      return { error: "Person not found" };
    }
  } catch (error) {
    return { error };
  }
}
