import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Post from '../../../../lib/models/Post';
import jwt from 'jsonwebtoken';

// GET - Obtener postulación específica
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const post = await Post.findById(id)
      .populate('author', 'name email avatar location tennisInfo')
      .populate('responses.user', 'name email avatar')
      .lean();

    if (!post) {
      return NextResponse.json(
        { message: 'Postulación no encontrada' },
        { status: 404 }
      );
    }

    // Increment view count
    await Post.findByIdAndUpdate(id, { $inc: { views: 1 } });
    post.views += 1;

    return NextResponse.json({ post });

  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar postulación
export async function PUT(request, { params }) {
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

    const { id } = params;
    const body = await request.json();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { message: 'Postulación no encontrada' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { message: 'No tienes permiso para editar esta postulación' },
        { status: 403 }
      );
    }

    // Update fields
    const allowedUpdates = [
      'title', 'description', 'level', 'status',
      'gameDetails', 'location', 'communication'
    ];

    Object.keys(body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        if (key === 'gameDetails' || key === 'location' || key === 'communication') {
          post[key] = { ...post[key], ...body[key] };
        } else {
          post[key] = body[key];
        }
      }
    });

    await post.save();
    await post.populate('author', 'name email avatar location tennisInfo');

    return NextResponse.json({
      message: 'Postulación actualizada exitosamente',
      post
    });

  } catch (error) {
    console.error('Update post error:', error);

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

// DELETE - Eliminar postulación
export async function DELETE(request, { params }) {
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

    const { id } = params;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { message: 'Postulación no encontrada' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { message: 'No tienes permiso para eliminar esta postulación' },
        { status: 403 }
      );
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Postulación eliminada exitosamente'
    });

  } catch (error) {
    console.error('Delete post error:', error);

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