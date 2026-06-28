import { saveApp } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) { // create or edit an app
  try {
    const { name, sessionID } = await request.json();

    if(typeof name !== "string") throw null;
    if(name.trim().length === 0) throw null;

    saveApp({
      createdAt: new Date(),
      name,
      owner: null
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