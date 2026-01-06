# Aufgabe 2: Akustisches Feedback & Sonifikation - VORLAGE

> Ziel: Sie sollen lernen, wie man nicht-visuelles Feedback in digitale Schnittstellen integriert. Sie werden den Unterschied zwischen Auditory Icons und Earcons praktisch anwenden, um die Benutzererfahrung durch multimodales Feedback zu verbessern.

## Aufgabenstellung

Erstellen Sie ein einfaches React-Dashboard für eine Media Library (Foto-Archiv). Die Anwendung soll folgende Funktionen und Feedbacks enthalten:

1. **Dateien löschen**: Beim Klick auf einen „Löschen"-Button soll ein **Auditory Icon** abgespielt werden, das akustisch das Vernichten einer Datei repräsentiert.

2. **Status-Meldung**: Wenn eine Datei erfolgreich hochgeladen oder gespeichert wurde, soll ein **Earcon** (eine kurze, aufsteigende Melodie aus synthetischen Klängen) abgespielt werden.

3. **Fortschritts-Sonifikation**: Implementieren Sie einen Regler (Slider). Während der Benutzer den Wert verändert, soll sich die Tonhöhe (Pitch) eines kontinuierlichen Tons proportional zum Wert verändern (Sonifikation von Daten).

## Was ist bereits implementiert?

- Grundlegende React-Struktur für eine Media Library
- Photo-Grid mit 25 Bildern (01.jpg - 25.jpg) in 5er-Reihen
- Drag & Drop Funktionalität für Upload
- Lösch-Funktionalität mit Papierkorb-Icon
- Zoom-Slider für das Grid
- Alle visuellen Komponenten und Styling

## Was müssen Sie implementieren?

Die Audio-Funktionalität in den entsprechenden Komponenten:
- **TrashSoundComponent**: Auditory Icon für Löschen-Aktion
- **SuccessChimeComponent**: Earcon für erfolgreiches Speichern
- **PitchSliderComponent**: Sonifikation für Zoom-Level-Änderungen

Suchen Sie nach den Kommentaren `// TODO: Audio-Implementierung` in den Dateien!

## Technische Hinweise:

- Für die Audio-Wiedergabe können Sie die Standard Web Audio API verwenden oder NPM-Pakete wie use-sound.
- Die Audiodateien sollten im `public/sounds/` Ordner liegen
- Achten Sie darauf, dass das auditive Feedback die visuelle Darstellung unterstützt, aber nicht ersetzt.

## Installation und Start

```bash
npm install
npm run dev
```


## Lizenzen
trash.wav: Angrily Crumpling Piece of Paper 2.wav by F.M.Audio -- https://freesound.org/s/560331/ -- License: Attribution 4.0