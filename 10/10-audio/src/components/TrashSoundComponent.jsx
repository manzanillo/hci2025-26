import { forwardRef, useImperativeHandle } from 'react'

const TrashSoundComponent = forwardRef((props, ref) => {
  // TODO: Audio-Implementierung
  // Diese Komponente soll ein Auditory Icon für das Löschen von Dateien abspielen.
  // Ein Auditory Icon nutzt Alltagsgeräusche mit semantischer Verbindung zur Aktion.
  // 
  // Aufgaben:
  // 1. Implementieren Sie die playTrashSound() Methode
  // 2. Verwenden Sie eine Audiodatei wie "trash.wav" oder "crush.wav"
  // 3. Die Datei sollte im public/sounds/ Ordner liegen
  // 
  // Hinweise:
  // - Verwenden Sie die Web Audio API oder das use-sound Package
  // - Das Geräusch sollte kurz und aussagekräftig sein
  // - Beispiel: Papier zerknüllen, Müllcontainer-Geräusch

  const playTrashSound = () => {
    // TODO: Implementieren Sie hier die Audio-Wiedergabe
    console.log('TrashSound würde jetzt abgespielt werden...')
  }

  useImperativeHandle(ref, () => ({
    playTrashSound
  }))

  return null // Diese Komponente rendert nichts visuell
})

TrashSoundComponent.displayName = 'TrashSoundComponent'

export default TrashSoundComponent