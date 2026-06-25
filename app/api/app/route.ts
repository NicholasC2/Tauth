import { db } from '@/src/db';
import { apps } from '@/src/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) { // create or edit an app
  try {
    const { name } = await request.json();

    if(typeof name !== "string") throw null;
    if(name.trim().length === 0) throw null;

    db.insert(apps).values({
      name
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or Server Error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) { // get an apps data
  try {
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or Server Error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) { // delete an app
  try {
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or Server Error' }, 
      { status: 500 }
    );
  }
}