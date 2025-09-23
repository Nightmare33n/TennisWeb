import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Post from '../../../lib/models/Post';
import User from '../../../lib/models/User';
import jwt from 'jsonwebtoken';

// GET - Obtener todas las postulaciones activas
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;

    let query = {
      status: 'active',
      expiresAt: { $gt: new Date() }
    };

    if (level && level !== 'all') {
      query.level = level;
    }

    if (city) {
      query['location.city'] = city;
    }

    const posts = await Post.find(query)
      .populate('author', 'name email avatar location tennisInfo')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva postulación
export async function POST(request) {
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

    const body = await request.json();
    const {
      title,
      description,
      level,
      preferredTime,
      courtType,
      gameType,
      duration,
      address,
      city,
      venueName,
      allowChat,
      allowWhatsApp,
      whatsappNumber
    } = body;

    // Validation
    if (!title || !description || !level || !preferredTime || !address || !city) {
      return NextResponse.json(
        { message: 'Todos los campos requeridos deben estar completos' },
        { status: 400 }
      );
    }

    if (allowWhatsApp && !whatsappNumber) {
      return NextResponse.json(
        { message: 'Número de WhatsApp requerido si permites contacto por WhatsApp' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const post = new Post({
      title: title.trim(),
      description: description.trim(),
      author: userId,
      level,
      gameDetails: {
        preferredTime,
        courtType,
        gameType,
        duration
      },
      location: {
        address: address.trim(),
        city,
        venueName: venueName?.trim() || null
      },
      communication: {
        allowChat: Boolean(allowChat),
        allowWhatsApp: Boolean(allowWhatsApp),
        whatsappNumber: allowWhatsApp ? whatsappNumber.trim() : null
      }
    });

    await post.save();

    // Populate author info for response
    await post.populate('author', 'name email avatar location tennisInfo');

    return NextResponse.json(
      {
        message: 'Postulación creada exitosamente',
        post
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create post error:', error);

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