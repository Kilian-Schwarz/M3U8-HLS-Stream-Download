TS File Recorder

Ein Firefox-Addon zum automatischen Aufzeichnen, Herunterladen und Zusammenführen von .ts-Dateien zu einem einzelnen Video.

Inhaltsverzeichnis

	•	Überblick
	•	Funktionsweise
	•	Funktionen
	•	Installation
	•	Verwendung
	•	Rechtlicher Hinweis
	•	Haftungsausschluss
	•	Lizenz

Überblick

TS File Recorder ist ein Firefox-Addon, das automatisch .ts-Dateien (Transport Stream) erfasst, die beim Abspielen von gestreamten Videos geladen werden. Es fügt diese Dateien zusammen und speichert das Ergebnis als einzelne Videodatei. Dies ist nützlich, um gestreamte Inhalte lokal zu speichern.

Funktionsweise

Das Addon überwacht den Netzwerkverkehr im Browser und erfasst alle .ts-Dateien, die beim Abspielen eines Videos geladen werden. Es beginnt automatisch mit der Aufnahme, sobald eine Webseite geladen wird. Über die Benutzeroberfläche können Sie das schnelle Laden des Videos starten, um sicherzustellen, dass alle Segmente erfasst werden. Beim Beenden der Aufnahme werden alle erfassten .ts-Dateien heruntergeladen, zusammengefügt und als einzelne Videodatei gespeichert.

Funktionen

	•	Automatische Aufnahme: Beginnt automatisch mit der Erfassung von .ts-Dateien, sobald eine Webseite geladen wird.
	•	Schnelles Laden: Überspringt automatisch durch das Video, um alle Segmente schnell zu laden.
	•	Live-Statusanzeige: Zeigt die Anzahl der erfassten Dateien und die geschätzte Gesamtdauer an.
	•	Zusammenführen von Segmenten: Fügt alle erfassten .ts-Dateien zu einer einzigen Videodatei zusammen.
	•	Speichern als MP4: Die zusammengefügte Datei wird als .mp4 gespeichert.

Installation

Voraussetzungen

	•	Firefox Browser

Schritte zur Installation über about:debugging

	1.	Herunterladen des Addons
	•	Laden Sie den Quellcode dieses Repositories herunter oder klonen Sie es.
	2.	Öffnen von about:debugging
	•	Geben Sie in der Adressleiste about:debugging#/runtime/this-firefox ein und drücken Sie die Eingabetaste.
	3.	Aktivieren des Entwicklermodus
	•	Klicken Sie auf “Diese Firefox” im linken Menü, falls nicht bereits ausgewählt.
	4.	Addon laden
	•	Klicken Sie auf die Schaltfläche “Temporäres Add-on laden”.
	•	Navigieren Sie zum Ordner des heruntergeladenen Addons und wählen Sie die Datei manifest.json aus.
	5.	Bestätigung
	•	Das Addon sollte nun in der Liste der geladenen temporären Addons erscheinen.

Hinweis: Temporäre Addons werden beim Schließen von Firefox entfernt. Um das Addon dauerhaft zu installieren, müssten Sie es signieren oder den Entwicklermodus verwenden.

Verwendung

	1.	Webseite öffnen
	•	Navigieren Sie zu der Webseite mit dem Video, das Sie aufnehmen möchten.
	2.	Automatische Aufnahme
	•	Die Aufnahme startet automatisch, sobald die Seite vollständig geladen ist.
	3.	Video starten
	•	Starten Sie das Video auf der Webseite.
	4.	Schnelles Laden starten
	•	Klicken Sie auf das Addon-Symbol in der Symbolleiste, um das Popup zu öffnen.
	•	Klicken Sie auf die Schaltfläche “Schnelles Laden starten”, um das Video automatisch durchzuspringen und alle .ts-Dateien zu laden.
	5.	Statusüberwachung
	•	Im Popup sehen Sie eine Live-Statusanzeige mit der Anzahl der erfassten Dateien und der geschätzten Gesamtdauer.
	6.	Aufnahme stoppen
	•	Sobald das gesamte Video geladen ist oder Sie die Aufnahme beenden möchten, klicken Sie auf “Aufnahme stoppen” im Popup.
	7.	Datei herunterladen
	•	Das Addon lädt die erfassten .ts-Dateien herunter, fügt sie zusammen und speichert die Datei als merged_video.mp4.

Rechtlicher Hinweis

Die Verwendung dieses Addons zum Herunterladen von urheberrechtlich geschütztem Material kann gegen die Nutzungsbedingungen der betreffenden Webseite verstoßen und illegal sein. Dieses Addon ist ausschließlich für den persönlichen Gebrauch bestimmt. Bitte respektieren Sie die Urheberrechte und die Nutzungsbedingungen der Inhalte, die Sie ansehen.

Haftungsausschluss

Der Entwickler dieses Addons übernimmt keine Haftung für die Art und Weise, wie Sie dieses Addon verwenden, oder für etwaige Verstöße gegen Gesetze oder Vorschriften, die sich aus seiner Verwendung ergeben könnten. Die Nutzung erfolgt auf eigene Gefahr. Der Entwickler haftet nicht für direkte oder indirekte Schäden, die durch die Verwendung dieses Addons entstehen.

Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe die LICENSE-Datei für Details.

Bitte beachten Sie: Dieses Addon ist ein Werkzeug, das technische Kenntnisse erfordert. Verwenden Sie es verantwortungsbewusst und in Übereinstimmung mit allen geltenden Gesetzen und Vorschriften.

Support

Bei Fragen oder Problemen öffnen Sie bitte ein Issue in diesem Repository.

Vielen Dank für die Verwendung von TS File Recorder!
