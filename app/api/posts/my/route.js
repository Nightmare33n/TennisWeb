import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Post from '../../../../lib/models/Post';
import jwt from 'jsonwebtoken';

// GET - Obtener mis postulaciones
export async function GET(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    let query = { author: userId };

    if (status !== 'all') {
      query.status = status;
    }

    const posts = await Post.find(query)
      .populate('author', 'name email avatar')
      .populate('responses.user', 'name email avatar')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Get my posts error:', error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}