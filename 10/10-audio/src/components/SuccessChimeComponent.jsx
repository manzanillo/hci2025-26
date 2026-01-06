import { forwardRef, useImperativeHandle } from 'react'

const SuccessChimeComponent = forwardRef((props, ref) => {
  // TODO: Audio-Implementierung
  // Diese Komponente soll ein Earcon für erfolgreiche Aktionen abspielen.
  // Ein Earcon ist eine kurze, abstrakte, nicht-sprachliche Tonfolge.
  // 
  // Aufgaben:
  // 1. Implementieren Sie die playSuccessChime() Methode
  // 2. Verwenden Sie eine Audiodatei wie "success.wav" oder "chime.wav"
  // 3. Die Datei sollte im public/sounds/ Ordner liegen
  // 
  // Hinweise:
  // - Verwenden Sie die Web Audio API oder das use-sound Package
  // - Der Ton sollte positiv und kurz sein
  // - Beispiel: aufsteigende Melodie, Glocken, harmonische Akkorde
  // - Unterschied zu Auditory Icons: abstrakt, nicht alltagsbezogen

  const playSuccessChime = () => {
    // TODO: Implementieren Sie hier die Audio-Wiedergabe
    console.log('SuccessChime würde jetzt abgespielt werden...')
  }

  useImperativeHandle(ref, () => ({
    playSuccessChime
  }))

  return null // Diese Komponente rendert nichts visuell
})

SuccessChimeComponent.displayName = 'SuccessChimeComponent'

export default SuccessChimeComponent