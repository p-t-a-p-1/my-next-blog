import { ImageResponse } from '@vercel/og'
import { handleClientScriptLoad } from 'next/script'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'ブログ詳細'

    return new ImageResponse(
      (
        <div
          style={{
            // backgroundImage: "url(https://og-image-example.vercel.app/bg.png)",
            backgroundColor: '#fff',
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              width: '100%',
              fontSize: 60,
              fontStyle: 'normal',
              fontWeight: 'bold',
              color: '#000',
              padding: '0 120px',
              lineHeight: 1.3,
              marginBottom: '30px',
              wordWrap: 'break-word',
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: '100%',
              fontSize: 40,
              fontStyle: 'normal',
              fontWeight: 'bold',
              color: '#000',
              padding: '0 120px',
              lineHeight: 1.3,
            }}
          >
            @hako_mavs
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
