import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Add CORS headers for broader browser compatibility
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json();
    const { fullName, email, socialHandle, description, platform } = body;

    // Validar campos requeridos
    if (!fullName || !email || !socialHandle || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno existan
    if (!process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_PAT) {
      console.error('Missing Airtable environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Llamada a Airtable desde el servidor (seguro)
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Table%201`;
    
    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: email.trim().toLowerCase(),
          Name: fullName.trim(),
          'Social Handle': socialHandle?.trim() || '',
          Description: description?.trim() || '',
          Platform: platform || 'Not specified'
        }
      })
    });

    if (airtableResponse.ok) {
      return NextResponse.json(
        { message: 'Contact submitted successfully' },
        { status: 200, headers: corsHeaders }
      );
    } else {
      const airtableError = await airtableResponse.json();
      console.error('Airtable error:', airtableError);
      return NextResponse.json(
        { error: 'Failed to submit contact' },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}