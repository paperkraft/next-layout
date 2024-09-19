import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const data = {name, email}
  console.log("data", data);
  
  if (typeof name === 'string' && typeof email === 'string') {
    return NextResponse.json({ message: 'Form submitted successfully', data });
  } else {
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 });
  }
}