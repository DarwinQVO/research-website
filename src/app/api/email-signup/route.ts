import { NextRequest, NextResponse } from 'next/server';

// Configuración para API routes dinámicas
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validar que el email existe y tiene @
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter an email address' },
        { status: 400 }
      );
    }

    // Debug logging
    console.log('🔍 Airtable Config:', {
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME,
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      email: email.trim().toLowerCase()
    });

    // Conectar a Airtable
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;
    console.log('📡 Making request to:', airtableUrl);

    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: email.trim().toLowerCase(),
        }
      })
    });

    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      // Si el error es por email duplicado
      if (data.error?.type === 'INVALID_REQUEST_BODY' && 
          data.error?.message?.includes('duplicate')) {
        return NextResponse.json({
          success: true,
          message: 'You\'re already on our list! We\'ll notify you when we launch.'
        });
      }
      
      console.error('Airtable error:', data);
      throw new Error(data.error?.message || 'Failed to save email');
    }

    return NextResponse.json({
      success: true,
      message: 'Perfect! You\'re on the list. We\'ll notify you when we launch.'
    });

  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint para ver emails registrados (solo desarrollo)
export async function GET() {
  return NextResponse.json({
    message: 'API is working! Use POST to register emails.',
    timestamp: new Date().toISOString()
  });
}