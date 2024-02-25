import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_URL}/note/${noteId}`,
      {
        headers: request.headers,
      }
    );

    const getNote = await response.json();

    if (getNote) {
      return NextResponse.json({ note: getNote.body });
    } else {
      return NextResponse.json({ message: 'note not found' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'request failed' });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/note`, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({ body: data.body }),
    });

    const createdNote = await response.json();

    if (createdNote) {
      return NextResponse.json({ note: createdNote });
    } else {
      return NextResponse.json({ message: 'Could not create note' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'request failed' });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_URL}/note/${noteId}`,
      {
        method: 'PUT',
        headers: request.headers,
        body: JSON.stringify({ body: data.body }),
      }
    );

    const updatedNote = await response.json();

    if (updatedNote) {
      return NextResponse.json({ note: updatedNote });
    } else {
      return NextResponse.json({ message: 'note has not been updated' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'request failed' });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_URL}/note/${noteId}`,
      {
        method: 'DELETE',
        headers: request.headers,
      }
    );

    const deletedNote = await response.json();

    if (deletedNote) {
      return NextResponse.json({ note: 'deleted note' });
    } else {
      return NextResponse.json({ messaeg: 'note has not been deleted' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'request failed' });
  }
}
