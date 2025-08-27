import { useEffect, useRef, useState } from 'react'

export function useSpeechToText(){
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SR){
      setSupported(true)
      const recog = new SR()
      recog.lang = 'en-GB'
      recog.interimResults = true
      recog.continuous = true
      recog.onresult = (e) => {
        let interimText = ''
        let finalText = ''
        for(let i=e.resultIndex; i < e.results.length; i++){
          const res = e.results[i]
          if(res.isFinal){ finalText += res[0].transcript + ' ' }
          else { interimText += res[0].transcript }
        }
        if(finalText){
          // Dispatch a custom event so editor can append
          window.dispatchEvent(new CustomEvent('speech-final', { detail: finalText }))
        }
        setInterim(interimText)
      }
      recog.onend = () => setListening(false)
      recognitionRef.current = recog
    }
  }, [])

  const start = () => {
    if(!recognitionRef.current) return
    recognitionRef.current.start()
    setListening(true)
  }

  const stop = () => {
    if(!recognitionRef.current) return
    recognitionRef.current.stop()
    setListening(false)
    setInterim('')
  }

  return { supported, listening, interim, start, stop }
}
