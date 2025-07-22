// Cloudflare Worker para manejar el formulario de forma segura
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://tu-dominio.com', // Cambiar a tu dominio
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  // Solo permitir POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers })
  }

  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.email || !body.fullName || !body.description) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      })
    }

    // Llamada a Airtable con credenciales seguras
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_PAT}`, // Variables de entorno del Worker
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
      }
    )

    if (!airtableResponse.ok) {
      throw new Error('Airtable submission failed')
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    })
  }
}