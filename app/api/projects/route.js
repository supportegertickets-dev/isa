import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/auth';
import { readData, writeData } from '../../lib/storage';

export async function GET() {
  try {
    const data = await readData('projects');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to read projects data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await writeData('projects', data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save projects data' }, { status: 500 });
  }
}
