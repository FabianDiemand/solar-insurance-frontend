![Solar Insurance Logo](./img/logo_w_text.png)

# Solar Insurance Frontend

HS 2023/2024, Blockchain, Fabian Diemand  
Dozenten: Malik El Bay, Oliver Dressler  
Repository Frontend: https://github.com/FabianDiemand/solar-insurance-frontend  
Repository Smart Contract:  https://github.com/FabianDiemand/solar-insurance-smartcontract  

---

## Inhalt
* [1 Einleitung](#1-einleitung)
* [2 Erklärung GUI](#2-erklärung-gui)
  * [2.1 Hauptansicht/ Landing Page](#21-hauptansicht-landing-page)
  * [2.2 Demo-Ansicht](#22-demo-ansicht)
* [3 Installation](#3-installation)
* [4 Demo/ Storybook](#4-demo-storybook)

---

## 1 Einleitung
Im Rahmen des Moduls Blockchain wurde sich mit Technologien, Anwendungsfällen und rechtlich-wirtschaftlichen Themen rund um die namensgebende Datenstruktur befasst. Teile des Gelernten sollten im Rahmen einer Semesterarbeit mit einer Literatur- oder Engineering-Arbeit angewandt werden.

Im Rahmen diese Semesterarbeit wurde ein Smart Contract geschrieben, der die Policies einer Versicherung für Betreiber einer Photovoltaik-Anlage (fortan PV-Anlage) modelliert. Der versicherte Schaden ist der finanzielle Mehraufwand, durch den Bezug von Strom aus dem Hauptnetz anstelle der eigenen PV-Anlage. Als Indikator für einen Schadenfall wird die Anzahl Sonnenscheinstunden pro Jahr herangezogen.

Die Erkenntnis, dass dieser Indikator nicht alleine relevant für eine Aussage über das Auftreten und das Ausmass eines potenziellen Schadens ist, ist für den Realitätsbezug relevant. Für die Semesterarbeit wird diese Feststellung nicht weiter verarbeitet. Ebenso werden Systemabhängigkeiten von Dritt-APIs zur Datenabfrage und externen Services (namentlich Chainlink) nur im Entwurf erwähnt. Der Fokus liegt auf der Umsetzung des Smart Contracts, dessen Deployment, Verifizierung und der Interaktion mit diesem durch eine grafische Schnittstelle.

## 2 Erklärung GUI
Die GUI der Solar Insurance DApp setzt sich aus einer Landing Page ('Insurance') und einer Demo Ansicht ('Demo') zusammen. Die Landing Page bildet die Zugriffsschnittstelle auf die für eine produktive Verwendung notwendigen Funktionen des Smart Contracts. Die Demo Ansicht hilft bei der Verwendung der DApp zu Demo und Test-Zwecken. Sie erlaubt Zustandsänderungen, die üblicherweise durch Interaktionen mit anderen Nutzern oder APIs ('Fund Contract', 'Create Sunshine Record') oder unter stärkeren Einschränkungen ('File Claim') möglich sind.

### 2.1 Hauptansicht/ Landing Page
![Hauptansicht](./img/fe-main.png)
Die Hauptansicht der Solar Insurance DApp unterstützt die Interaktion mit den zentralen Funktionen des Smart Contract und bietet einige Metadaten zum Smart Contract. So werden die Adresse des Owners, sowie des Contracts angezeigt und mit einer Verlinkung auf Etherscan versehen.

Mit 'Calculate Premium' kann die Prämie für die gewünschte Konfiguration der Versicherungspolice berechnet werden. Damit können mögliche Policen gegeneinander abgewogen werden, ohne dass immer der Umweg über einen angestossenen Bezahlvorgang im Wallet in Kauf genommen werden muss. Im nächsten Schritt 'Register Policy' kann die eigene Police konfiguriert und abgeschlossen werden. Erst jetzt fällt auch eine Abfrage aus dem Wallet mit dem entsprechenden Betrag für die Deckung der Prämie an. Die Policy wird nun durch einen Klick auf 'Refresh View' im nächsten Panel 'Currently Active Policy' angezeigt. Im selben Panel kann ausserdem die Policy durch einen Klick auf 'Extend Policy' jeweils um ein Jahr verlängert werden. Schliesslich kann im Panel 'File Claim' eine Deckungsleistung für einen angefallenen Schaden eingefordert werden.

### 2.2 Demo-Ansicht
![Demoansicht](./img/fe-demo.png)
Die Demo-Ansicht beinhaltet Funktionen, welche nicht für den Einsatz in einem realistischen Szenario vorgesehen sind, jedoch für eine Verwendung im Kontext eines Tests oder einer Demo vorhanden sein müssen. Da in einem Demo-Szenario die Menge der Versicherten und/ oder ein Konzept für die initiale Finanzierung der Versicherung fehlt, muss der Contract über die 'Fund Contract' Oberfläche mit einer bestimmten Menge Ether vorfinanziert werden. Ebenfalls fehlt für die Umsetzung im Rahmen der Semesterarbeit eine Anbindung an eine Wetterschnittstelle, die die benötigten Sonnenschein-Daten liefert. Entsprechend müssen Aufzeichnungen manuell erfasst werden. Dafür wird die Oberfläche 'Create Sunshine Record' angeboten, die die Spezifizierung eines Jahrs, einer Region und der Anzahl Sonnenscheinstunden pro Jahr für eine Aufzeichnung erlaubt. Zuletzt muss für ein Testszenario die Kontrolle für die Einreichung eines Schadenersatzanspruchs gelockert werden, da zwischen dem Abschluss der Versicherung und der Einrichtung kein Jahr gewartet werden kann. Entsprechend greift die Oberfläche 'Fund Claim' in der Demo-Ansicht auf eine andere Schnittstelle des Vertrags zu, als jene der Hauptansicht. Die Business Logik ist identisch.

## 3 Installation
<!-- TODO Docker Compose Deployment umsetzen und erklären -->
#### Anforderungen:
- [Metamask Wallet](https://metamask.io/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### Anleitung:
1) Clone das Repository
   ```bash
   git clone git@github.com:FabianDiemand/solar-insurance-frontend.git
   ```
2) Navigiere in das geclonte Repository
   ```bash
   cd solar-insurance-frontend
   ```
3) Starte die Anwendung mit dem Befehl 'docker-compose up'
   ```bash
   docker-compose up
   ```
4) Die Anwendung läuft auf dem Localhost unter Port 8080 [localhost:8080](http://localhost:8080)

## 4 Demo/ Storybook
<!-- TODO Demo/ Storybook erstellen -->