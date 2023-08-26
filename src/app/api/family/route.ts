import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/connect-db";
import { createPerson, deletePerson, getPersons, updatePerson } from "@/lib/person-db";
import { createErrorResponse } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");

    // const page = page_str ? parseInt(page_str, 10) : 1;
    // const limit = limit_str ? parseInt(limit_str, 10) : 10;

    const { persons, results, error } = await getPersons();

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      results,
      persons,
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    // if (!body.name) {
    //   return createErrorResponse("Person must have a name", 400);
    // }
    console.log({body})
    const { person, error } = await createPerson(body);
    if (error) throw error;
    let json_response = {
      status: "success",
      data: {
        person,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return createErrorResponse("Person with id already exists", 409);
    }

    return createErrorResponse(error.message, 400);
  }
}
export async function PATCH(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.id) {
      return createErrorResponse("Person must have a name", 400);
    }

    const { person, error } = await updatePerson(body.id, body);
    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        person,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return createErrorResponse("Person with id already exists", 409);
    }

    return createErrorResponse(error.message, 500);
  }
}
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log({ body });
    if (!body.id) {
      return createErrorResponse("Person must have a name", 400);
    }

    const { id, error } = await deletePerson(body.id);
    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        id,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return createErrorResponse("Person with id already exists", 409);
    }

    return createErrorResponse(error.message, 500);
  }
}
