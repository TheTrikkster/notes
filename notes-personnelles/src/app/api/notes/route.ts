import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/note`, {
      headers: request.headers,
    });

    const getNotes = await response.json();

    if (getNotes?.length) {
      return NextResponse.json({ notes: getNotes });
    } else {
      return NextResponse.json({ message: 'did not get notes' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'request failed' });
  }
}
