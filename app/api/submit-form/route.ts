import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Usar variables de entorno del servidor (sin NEXT_PUBLIC)
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;
    
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: body.email,
          Name: body.fullName,
          'Social Handle': body.socialHandle || '',
          Description: body.description || '',
          Platform: body.platform || 'Not specified'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Airtable');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}