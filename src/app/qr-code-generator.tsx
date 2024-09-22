"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import storypng from "../assets/images/storyset-qrcode.png"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import QRCode from 'qrcode'
import Image from 'next/image'

export default function QRCodeGenerator() {
  const [qrCode, setQRCode] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const qrRef = useRef<HTMLCanvasElement>(null)

  const generateQRCode = async () => {
    try {
      const canvas = qrRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, input || ' ', {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        })
        setQRCode(canvas.toDataURL('image/png'))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a')
      link.href = qrCode
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e2e] flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={storypng.src}
              width={400}
              height={400}
              alt="QR Code Illustration"
              className="w-full h-auto"
            />
          </div>
          <Card className="w-full md:w-1/2 bg-[#2a2a3e] text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">GERAR QR CODE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="input" className="block text-sm font-medium mb-1">
                  Insira um texto ou link
                </label>
                <Input
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-[#3a3a4e] border-[#4a4a5e] text-white"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setInput('')}
                  variant="outline"
                  className="flex-1 bg-[#3a3a4e] hover:bg-[#4a4a5e] text-white"
                >
                  LIMPAR
                </Button>
                <Button
                  onClick={generateQRCode}
                  className="flex-1 bg-[#6a6a8e] hover:bg-[#7a7a9e] text-white"
                >
                  GERAR
                </Button>
              </div>
              <div className="flex justify-center">
                <canvas ref={qrRef} className="hidden" />
                {qrCode && (
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 bg-white p-2" />
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleDownload}
                disabled={!qrCode}
                className="w-full bg-[#6a6a8e] hover:bg-[#7a7a9e] text-white"
              >
                DOWNLOAD
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="bg-[#1e1e2e] py-4 text-center text-white text-sm">
        <a href='https://github.com/lucasdwn' target='_blank' rel="noopener noreferrer" className="hover:underline">
          Lucasdwn - Github
        </a>
      </footer>
    </div>
  )
}