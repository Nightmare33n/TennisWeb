import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import { generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, location, tennisInfo } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Ya existe una cuenta con este email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      location: location || {},
      tennisInfo: tennisInfo || {}
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          tennisInfo: user.tennisInfo,
          onboardingCompleted: user.onboardingCompleted
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}