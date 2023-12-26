![Solar Insurance Logo](./img/logo_w_text.png)

# Solar Insurance DApp Frontend

FFHS PiBS, HS 2023/2024, Blockchain, Fabian Diemand  
Dozenten: Malik El Bay, Oliver Dressler  
Repository Frontend: https://github.com/FabianDiemand/solar-insurance-frontend  
Repository Smart Contract:  https://github.com/FabianDiemand/solar-insurance-smartcontract  

---

## Inhalt
* [1 Einleitung](#1-einleitung)
* [2 Smart Contract](#2-smart-contract)
* [2 Erklärung GUI](#3-erklärung-gui)
  * [2.1 Hauptansicht/ Landing Page](#31-hauptansicht-landing-page)
  * [2.2 Demo-Ansicht](#32-demo-ansicht)
* [4 Technologien und Services](#4-technologien-und-services)
  * [4.1 VS Code und Docker](#41-vs-code-und-docker)
  * [4.2 ReactJS, Tailwind und DaisyUI](#42-reactjs-tailwind-und-daisyui)
  * [4.3 Ethers.js](#43-ethersjs)
  * [4.4 Weitere](#44-weitere)
* [3 Installation](#5-installation)
* [4 Demo/ Storybook](#6-demo-storybook)

---

## 1 Einleitung
Im Rahmen des Moduls Blockchain wurde sich mit Technologien, Anwendungsfällen und rechtlich-wirtschaftlichen Themen rund um die namensgebende Datenstruktur befasst. Teile des Gelernten sollten im Rahmen einer Semesterarbeit mit einer Literatur- oder Engineering-Arbeit angewandt werden.

Im Rahmen diese Semesterarbeit wurde ein Smart Contract geschrieben, der die Policies einer Versicherung für Betreiber einer Photovoltaik-Anlage (fortan PV-Anlage) modelliert. Der versicherte Schaden ist der finanzielle Mehraufwand, durch den Bezug von Strom aus dem Hauptnetz anstelle der eigenen PV-Anlage. Als Indikator für einen Schadenfall wird die Anzahl Sonnenscheinstunden pro Jahr herangezogen.

Die Erkenntnis, dass dieser Indikator nicht alleine relevant für eine Aussage über das Auftreten und das Ausmass eines potenziellen Schadens ist, ist für den Realitätsbezug relevant. Für die Semesterarbeit wird diese Feststellung nicht weiter verarbeitet. Ebenso werden Systemabhängigkeiten von Dritt-APIs zur Datenabfrage und externen Services (namentlich Chainlink) nur im Entwurf erwähnt. Der Fokus liegt auf der Umsetzung des Smart Contracts, dessen Deployment, Verifizierung und der Interaktion mit diesem durch eine grafische Schnittstelle.

## 2 Smart Contract
Die Solar Insurance DApp setzt sich aus einem Frontend und einem Smart Contract zusammen. Der Smart Contract ist unter der Adresse [0x1c668eafa578dc863e4776407a175341aa5d0965](https://sepolia.etherscan.io/address/0x1c668eafa578dc863e4776407a175341aa5d0965) auf der Seplia Testchain bereitgestellt. Deployment und Code des Contracts, sowie die ABI, Transaktionen und Event Logs können in Etherscan eingesehen werden. Weitere Details zum Smart Contract sind im Wiki zum [Source Code auf GitHub](https://github.com/FabianDiemand/solar-insurance-smartcontract), sowie in der zugehörigen Semesterarbeit dokumentiert.

## 3 Erklärung GUI
Die GUI der Solar Insurance DApp setzt sich aus einer Landing Page ('Insurance') und einer Demo Ansicht ('Demo') zusammen. Die Landing Page bildet die Zugriffsschnittstelle auf die für eine produktive Verwendung notwendigen Funktionen des Smart Contracts. Die Demo Ansicht hilft bei der Verwendung der DApp zu Demo und Test-Zwecken. Sie erlaubt Zustandsänderungen, die üblicherweise durch Interaktionen mit anderen Nutzern oder APIs ('Fund Contract', 'Create Sunshine Record') oder unter stärkeren Einschränkungen ('File Claim') möglich sind.

### 3.1 Hauptansicht/ Landing Page
![Hauptansicht](./img/fe-main.png)
Die Hauptansicht der Solar Insurance DApp unterstützt die Interaktion mit den zentralen Funktionen des Smart Contract und bietet einige Metadaten zum Smart Contract. So werden die Adresse des Owners, sowie des Contracts angezeigt und mit einer Verlinkung auf Etherscan versehen.

Mit 'Calculate Premium' kann die Prämie für die gewünschte Konfiguration der Versicherungspolice berechnet werden. Damit können mögliche Policen gegeneinander abgewogen werden, ohne dass immer der Umweg über einen angestossenen Bezahlvorgang im Wallet in Kauf genommen werden muss. Im nächsten Schritt 'Register Policy' kann die eigene Police konfiguriert und abgeschlossen werden. Erst jetzt fällt auch eine Abfrage aus dem Wallet mit dem entsprechenden Betrag für die Deckung der Prämie an. Die Policy wird nun durch einen Klick auf 'Refresh View' im nächsten Panel 'Currently Active Policy' angezeigt. Im selben Panel kann ausserdem die Policy durch einen Klick auf 'Extend Policy' jeweils um ein Jahr verlängert werden. Schliesslich kann im Panel 'File Claim' eine Deckungsleistung für einen angefallenen Schaden eingefordert werden. Die Liste der 'Sunshine Records' erlaubt eine Einsicht in erfasste Sonnenschein-Einträge. So kann ein Anwender zunächst prüfen, ob die Einforderung von Schadenleistungen erfolgsversprechend ist bzw. ob eine Diskrepanz zwischen der Versicherten Anzahl Sonnenstunden und der tatsächlichen Dauer des Sonnenscheins zum Nachteil des Anwenders vorliegt.

### 3.2 Demo-Ansicht
![Demoansicht](./img/fe-demo.png)
Die Demo-Ansicht beinhaltet Funktionen, welche nicht für den Einsatz in einem realistischen Szenario vorgesehen sind, jedoch für eine Verwendung im Kontext eines Tests oder einer Demo vorhanden sein müssen. Da in einem Demo-Szenario die Menge der Versicherten und/ oder ein Konzept für die initiale Finanzierung der Versicherung fehlt, muss der Contract über die 'Fund Contract' Oberfläche mit einer bestimmten Menge Ether vorfinanziert werden. Ebenfalls fehlt für die Umsetzung im Rahmen der Semesterarbeit eine Anbindung an eine Wetterschnittstelle, die die benötigten Sonnenschein-Daten liefert. Entsprechend müssen Aufzeichnungen manuell erfasst werden. Dafür wird die Oberfläche 'Create Sunshine Record' angeboten, die die Spezifizierung eines Jahrs, einer Region und der Anzahl Sonnenscheinstunden pro Jahr für eine Aufzeichnung erlaubt. Zuletzt muss für ein Testszenario die Kontrolle für die Einreichung eines Schadenersatzanspruchs gelockert werden, da zwischen dem Abschluss der Versicherung und der Einrichtung kein Jahr gewartet werden kann. Entsprechend greift die Oberfläche 'Fund Claim' in der Demo-Ansicht auf eine andere Schnittstelle des Vertrags zu, als jene der Hauptansicht. Die Business Logik ist identisch. 

## 4. Technologien und Services
### 4.1 VS Code und Docker
Der Code für das Frontend wurde gänzlich in [VisualStudio Code](https://code.visualstudio.com/) geschrieben. Die Entwicklungsumgebung wurde in einem [Development Container](https://containers.dev/) aufgesetzt, um keine Tools und Abhängigkeiten lokal installieren zu müssen. Die einfache Portierbarkeit der Umgebung ist ein weiterer Vorteil dieser Vorgehensweise, die bei der Entwicklung jedoch nicht zum tragen kam. Docker ist eine Voraussetzung für die Verwendung von Dev Containern mit VS Code und wurde weiter für das Deployment und die Betriebsart der Abgabe gewählt wurde. Dank Docker Compose und einem entsprechenden Dockerfile ist auch hier wieder grundsätzlich die Plattformunabhängigkeit gegeben. Der Prozess der Inbetriebnahme beschränkt sich auf das Clonen des Repositories und die Eingabe eines Commands (vgl. [Abschnitt 5, Installation](#5-installation)).

### 4.2 Reactjs, Tailwind und DaisyUI
Die Wahl des Frameworks für das Frontend fiel auf [Reactjs](https://react.dev/). Ausgehend von einem minimalen Entwurf machte eine komponentenbasierte Gestaltung Sinn. Gekoppelt an die Vorkenntnisse mit dem Framework war in kürzerer Zeit ein ansprechendes MVP Frontend zu erreichen, als in reinem HTML, CSS und JavaScript. Die Erweiterung durch TypeScript war ebenfalls naheliegend, um die Entwicklung zu vereinfachen. Mit [Tailwind](https://tailwindcss.com/) und [DaisyUI](https://daisyui.com/) konnte eine einfache Handhabung von Styling und vorgefertigten Sub-Komponenten profitiert werden, welche das Endergebnis positiv beeinflussen. 

### 4.3 Ethers.js
[Ethers.js](https://docs.ethers.org/v6/) wurde als Bibliothek zur einfachen Interaktion mit dem Smart Contract gewählt. Dank der Konzepte von Providern, Contracts und Signers, mit welchen Ethers die Interaktionen mit dem Smart Contract und die dafür benötigten Rollen abstrahiert, ist die erste Integration schnell realisiert und die komplexeren Probleme können rasch in Angriff genommen werden. Weiter verfügt Ethers.js über ein Typing, welches durch die vorherige Wahl von Typescript begünstigt wird. 

Weiter eignet sich Ethers.js hervorragend für die Interaktion mit Smart Contracts auf Ethereum, als auch auf der Sepolia Testchain, wir aktiv weiterentwickelt und bietet eine nahtlose Integration von Metamask Wallets.

### 4.4 Weitere
#### Webpack, Babel, NGINX
Da mit Create-React-App eine sehr einfache Option für das Aufsetzen einer React Anwendung nicht regelmässig weiterentwickelt wird, wird hier auf ein reines [Webpack](https://webpack.js.org/) Deployment mit [Babel](https://babeljs.io/) und ohne den Support durch CRA gesetzt. Babel kompiliert Browser-kompatiblen JS Code aus den Typescript- und TSX-Dateien. Webpack (mit den entsprechenden Plugins) bundelt schliesslich alle benötigten Dateien ein ein Web-kompatibles Erzeugnis, welches hier in einem Container mit NGINX bereitgestellt wird.

#### DALL-E 3
Dall-E 3 (in [ChatGPT 4](https://chat.openai.com/)) wurde verwended um das Logo für die DApp anhand von Prompts zu generieren und freizustellen.

Folgende Prompts wurden verwendet, um ein Resultat zu generieren bzw. zu verfeinern:
>Create a logo for an insurance company.
>
>The company's name is "Solar Insurance". It aims for people having solar powered photovoltaik panels as a green source of power. It will protect it's customers from damages resulting from having to buy power from the mainnet instead of consuming for free from their solar panels.
>
>The insurance policies are modelled as a smart contract. Therefore the logo should somehow reflect the usage of a blockchain and web3.

Resultat: <br>
<img src='./img/logo_v1.png' width='33%'/>

>Make it simpler, put more emphasis on the solar aspect. Also use more warm colours, to make the logo more welcoming.

Resultat: <br>
<img src='./img/logo_v2.png' width='33%'/>

>Please make the white background of that image transparent.

Resultat: <br>
<img src='./img/logo_w_text.png' width='33%'>

#### Pexels
[Pexels](https://www.pexels.com/de-de/foto/licht-dach-sonne-technologie-18316989/) wird verwendet, um das Hintergrundbild der Anwendung zur Verfügung zu stellen. Bilder von Pexels sind kostenlos und dürfen selbst für kommerzielle Zwecke ohne Lizenz oder entsprechende Erwähnung verwendet werden.

Mangels CDN für die Anwendung verweist die [Quell-URL direkt auf Pexels](https://images.pexels.com/photos/18316989/pexels-photo-18316989/free-photo-of-licht-dach-sonne-technologie.jpeg).


## 5 Installation
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

## 6 Demo/ Storybook
Diese Storybook bezieht sich auf den Zeitpunkt der Abgabe der Semesterarbeit. Insbesondere der Zustand der Anwendung wird sich durch die Verwendung der DApp ändern. Ebenfalls könnten zu späteren Zeitpunkten gewisse Eigenschaften nicht mehr Erfüllt sein, wodurch die Verhaltenslogik möglicherweise vom Storybook abweichen kann. Die Daten für das Storybook sind frei erfunden und dienen der Anwendung als Demo.

Das Storybook besteht aus einer tabellarischen Auflistung von Schritten, die mit einer Nummerierung, einem Titel, den involvierten GUI-Komponenten und einer Beschreibung der Aktion versehen sind.

|Schritt   |Titel   |Komponente   |Beschreibung   |
|---|---|---|---|
|1   |Prämie berechnen   |Insurance - Calculate Premium   |Berechne die Prämie einer Versicherung mit folgender Konfiguration: Insured Risk -> High, Panel Region -> 'Switzerland North', Panel area -> 60 <br> Das erwartete Resultat sind eine Prämie von **0.021 ETH**.  |
|2   |Police abschliessen   |Insurance - Register Policy   |Spiegle die Konfiguration aus Schritt 1 in der 'Register Policy'-Komponente. Schliesse daraufhin die Versicherung mit einem Klick auf 'Register' ab. Metamask wird die Bestätigung der Transaktion von 0.021 ETH und den anfallenden Gas Gebühren anfordern. <br> Warte bis die Transaktion finalisiert ist.    |
|3   |Police prüfen  |Insurance - Currently Active Policy  |Klicke den 'Refresh View' Button, um die abgeschlossene Police in der 'Currently Active Policy' Komponente angezeigt zu bekommen. Nebst deiner Adresse als 'Policy Holder' und der Konfiguratino der Police, siehst du das Abschluss-Datum, wie lange die Police gültig ist und wann der erste Anspruch geltend gemacht werden kann.   |
|4   |Schadenfälle prüfen   |Insurance - Sunshine Records / <br> Demo - Sunshine Records  |Prüfe, ob ein Schadenfall (Diskrepanz zwischen der Versicherten Anzahl Sonnenstunden und der tatsächlichen Dauer des Sonnenscheins zu deinem Nachteil) vorliegt. <br> In der Demo Ansicht erkennst du eine solche Diskrepanz im Jahr 2023, in deiner Region (du hast 1803 Stunden versichert, die Sonne schien effektiv 1600 Stunden).  |
|5   |Schadenersatz einfordern   |Demo - Claim Fund   |Den gefundenen Schaden kannst du in der Demo Ansicht geltend machen. In der Insurance Ansicht wird die Schadenmeldung durch einen Check abgelehnt, da rückwirkend keine Forderungen geltend gemacht werden können. <br> Du erhältst eine Gutschrift von 0.05 ETH.   |
|6   |Versicherung verlängern   |Insurance - Currently Active Policy   |Überzeugt von der Dienstleistung willst du die Versicherung um ein Jahr verlängern. Hierzu klickst du die 'Extend Policy' Schaltfläche in der aktuell aktiven Police. Wiederum bittet Metamask um eine Bestätigung der Transaktion. <br> Sobald die Transaktion abgeschlossen ist, kann die neue Police durch 'Reload View' aktualisiert werden. <br> Die Validität wurde um ein Jahr verlängert.   |

Analog zu diesem Beispiel können weitere Abläufe unter Einbezug eigener manuell erfasster Daten durchgespielt werden.