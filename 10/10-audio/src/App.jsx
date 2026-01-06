import { useState, useRef } from 'react'
import './App.css'
import TrashSoundComponent from './components/TrashSoundComponent'
import SuccessChimeComponent from './components/SuccessChimeComponent'
import PitchSliderComponent from './components/PitchSliderComponent'

function App() {
  // State für die Fotos (25 Fotos von 01.jpg bis 25.jpg)
  const [photos, setPhotos] = useState(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      src: `/${String(i + 1).padStart(2, '0')}.jpg`,
      name: `Photo ${i + 1}`
    }))
  })

  // State für Zoom-Level (bestimmt Anzahl Spalten: 3-8)
  const [zoomLevel, setZoomLevel] = useState(5)
  
  // State für Status-Nachrichten
  const [statusMessage, setStatusMessage] = useState('')
  
  // Refs für Audio-Komponenten
  const trashSoundRef = useRef()
  const successChimeRef = useRef()
  const pitchSliderRef = useRef()

  // Drag & Drop Funktionalität
  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      // TODO: Audio-Implementierung - Success Chime abspielen
      // successChimeRef.current?.playSuccessChime()
      
      showStatusMessage(`${imageFiles.length} Datei(en) erfolgreich hochgeladen!`)
      
      // Simuliere Upload (in echter App würden hier neue Fotos hinzugefügt)
      console.log('Dateien hochgeladen:', imageFiles.map(f => f.name))
    }
  }

  // Foto löschen
  const deletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId))
    
    // TODO: Audio-Implementierung - Trash Sound abspielen
    // trashSoundRef.current?.playTrashSound()
    
    showStatusMessage('Foto gelöscht')
  }

  // Status-Nachricht anzeigen
  const showStatusMessage = (message) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage(''), 3000)
  }

  // Zoom-Level ändern
  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel)
    
    // TODO: Audio-Implementierung - Pitch Sound entsprechend Zoom-Level
    // pitchSliderRef.current?.updatePitch(newZoomLevel)
  }

  return (
    <div className="media-library">
      {/* Audio-Komponenten */}
      <TrashSoundComponent ref={trashSoundRef} />
      <SuccessChimeComponent ref={successChimeRef} />
      <PitchSliderComponent ref={pitchSliderRef} />

      {/* Header */}
      <header className="library-header">
        <h1 className="library-title">📸 Media Library</h1>
        <div className="controls">
          <div className="zoom-control">
            <label className="zoom-label">Zoom Level:</label>
            <input
              type="range"
              min="3"
              max="8"
              value={zoomLevel}
              onChange={(e) => handleZoomChange(parseInt(e.target.value))}
              className="zoom-slider"
            />
            <span>{zoomLevel} Spalten</span>
          </div>
        </div>
      </header>

      {/* Upload Area */}
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📁</div>
        <div className="upload-text">
          Ziehen Sie Bilder hierher zum Hochladen
        </div>
        <div className="upload-text" style={{ fontSize: '0.9rem', color: '#999' }}>
          Unterstützte Formate: JPG, PNG, GIF
        </div>
      </div>

      {/* Photo Grid */}
      <div className={`photo-grid grid-cols-${zoomLevel}`}>
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.src}
              alt={photo.name}
              className="photo-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuNGVtIj5CaWxkICMke3Bob3RvLmlkfTwvdGV4dD48L3N2Zz4='
              }}
            />
            <button
              className="delete-btn"
              onClick={() => deletePhoto(photo.id)}
              title="Foto löschen"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="status-message">
          {statusMessage}
        </div>
      )}
    </div>
  )
}

export default App