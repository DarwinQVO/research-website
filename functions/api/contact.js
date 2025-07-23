// Cloudflare Pages Function for secure contact form
export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers for all browsers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { fullName, email, socialHandle, description, platform } = body;

    // Validate required fields
    if (!fullName || !email || !socialHandle || !description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Check environment variables
    if (!env.AIRTABLE_BASE_ID || !env.AIRTABLE_PAT) {
      console.error('Missing Airtable environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Call Airtable API securely
    const airtableUrl = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/Table%201`;
    
    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.AIRTABLE_PAT}`,
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
      return new Response(
        JSON.stringify({ message: 'Contact submitted successfully' }),
        { status: 200, headers: corsHeaders }
      );
    } else {
      const airtableError = await airtableResponse.json();
      console.error('Airtable error:', airtableError);
      return new Response(
        JSON.stringify({ error: 'Failed to submit contact' }),
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('Contact function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}