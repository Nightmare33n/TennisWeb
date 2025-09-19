import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import { generateToken } from '../../../../lib/auth';

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL || 'http://localhost:3000'
);

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { code, state } = body;

    if (!code) {
      return NextResponse.json(
        { message: 'Código de autorización requerido' },
        { status: 400 }
      );
    }

    // Exchange authorization code for tokens
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    // Get user info from Google
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, email_verified } = payload;

    if (!email_verified) {
      return NextResponse.json(
        { message: 'Email no verificado por Google' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists, log them in
      if (!user.googleId) {
        // Link Google account to existing user
        user.googleId = payload.sub;
        user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        googleId: payload.sub,
        avatar: picture,
        onboardingCompleted: false,
        location: {},
        tennisInfo: {}
      });

      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    return NextResponse.json(
      {
        message: user ? 'Inicio de sesión exitoso' : 'Usuario creado exitosamente',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          location: user.location,
          tennisInfo: user.tennisInfo,
          onboardingCompleted: user.onboardingCompleted
        },
        isNewUser: !user.onboardingCompleted
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json(
      { message: 'Error de autenticación con Google' },
      { status: 500 }
    );
  }
}