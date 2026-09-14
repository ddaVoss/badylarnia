# Badylarnia — strona internetowa

Statyczna strona (czyste HTML/CSS/JS, bez żadnych instalacji) dla kawiarni
**Badylarnia Roślinna Kawiarnia** w Luboniu.

**Licencja:** wszelkie prawa zastrzeżone — zobacz [LICENSE](LICENSE) przed
kopiowaniem lub ponownym wykorzystaniem czegokolwiek z tego repozytorium.

## Struktura plików

```
Badylarnia/
├── index.html          strona główna (hero, o nas, galeria, opinie, kontakt)
├── menu.html            zakładka „Menu”
├── logo.jpg              logo kawiarni (favicon + nagłówek)
├── css/style.css         wszystkie style
├── js/main.js            nawigacja, animacje, status „otwarte/zamknięte”, oceny Google
├── js/config.js          ustawienia (m.in. klucz do żywych opinii Google)
└── images/               prawdziwe zdjęcia lokalu (z Google Maps / Facebooka)
```

## Jak zobaczyć stronę

Wystarczy dwukrotnie kliknąć plik `index.html` — otworzy się w przeglądarce.
Żeby wrzucić stronę do internetu, wgraj całą zawartość tego folderu na dowolny
hosting (np. Netlify, Vercel, GitHub Pages albo zwykły hosting z FTP) —
nic nie trzeba „budować” ani instalować.

## Jak włączyć żywe opinie Google (5,0 ★ / liczba opinii aktualizowana automatycznie)

Domyślnie strona pokazuje ostatnią znaną ocenę (5,0 / 299 opinii) wpisaną na
sztywno w `js/config.js`. Żeby liczby aktualizowały się **same, prosto z Google**,
potrzebny jest darmowy klucz Google Places API:

1. Wejdź na [console.cloud.google.com](https://console.cloud.google.com/) i utwórz
   (lub wybierz) projekt.
2. W wyszukiwarce wpisz **„Places API (New)”** i kliknij **Włącz**.
3. Przejdź do **API i usługi → Dane logowania → Utwórz dane logowania → Klucz API**.
4. Kliknij w nowo utworzony klucz i w sekcji **Ograniczenia dotyczące aplikacji**
   wybierz **Witryny (HTTP referrer)**, a następnie dodaj adres swojej strony,
   np. `https://badylarnia.pl/*` (i ewentualnie `http://localhost/*` na testy).
   W sekcji **Ograniczenia interfejsu API** zaznacz tylko **Places API (New)**.
5. Skopiuj klucz i wklej go w pliku `js/config.js`:

   ```js
   GOOGLE_PLACES_API_KEY: "TU_WKLEJ_SWOJ_KLUCZ",
   ```

Od tego momentu ocena i liczba opinii na stronie (w hero i w sekcji „Opinie”)
będą pobierane bezpośrednio z Google przy każdym wejściu na stronę — pojawi
się przy nich mała etykieta „aktualizowane na żywo”. Jeśli nie chcesz się tym
zajmować — nic nie rób, strona będzie normalnie działać z wpisaną na sztywno
wartością (po prostu trzeba ją będzie od czasu do czasu ręcznie poprawić w
`config.js`).

**Koszt:** Google daje 200 USD darmowego kredytu miesięcznie na Places API —
przy ruchu małej kawiarnianej strony to praktycznie zawsze 0 zł, ale warto
ustawić w Google Cloud alert budżetowy „na wszelki wypadek”.

## Jak podmienić / dodać zdjęcia

Wszystkie zdjęcia leżą w folderze `images/`. Żeby podmienić zdjęcie:

1. Wrzuć nowy plik do `images/` (najlepiej `.jpg`, max ok. 2000px szerokości —
   będzie się szybciej ładować).
2. W `index.html` / `menu.html` znajdź `<img src="images/NAZWA.jpg" ...>`
   i podmień nazwę pliku.

Obecne zdjęcia pochodzą z oficjalnego profilu Badylarni w Google Maps
(zakładka „Od właściciela”) oraz ze zdjęcia w tle na Facebooku.

## Sekcja „Popularne w Badylarni” (zdjęcia klikalne)

Na stronie głównej, w sekcji „Popularne w Badylarni”, każda pozycja (Matcha
Latte, Cynamonka, Kardamonka, Pistacjanka, Tort Czekoladowo-Malinowy, Kakao,
Napar imbirowo-kurkumowy, Babyccino) jest teraz klikalnym przyciskiem — po
kliknięciu zdjęcie po lewej stronie płynnie zmienia się na zdjęcie tego
konkretnego produktu.

**Skąd te zdjęcia:** to prawdziwe zdjęcia dokładnie tych dań, które
publicznie widnieją na profilu Badylarni w Google Maps (sekcja „Popularne
dania”) — zrobili i wrzucili je Wasi zadowoleni goście. Na stronie nie ma
podanych ich nazwisk (wygląda to jak zwykłe zdjęcie produktowe), ale warto o
tym wiedzieć. Jeśli wolelibyście mieć tam własne, oficjalne zdjęcia
(np. z Instagrama albo zrobione osobno) — wystarczy podmienić pliki w
`images/` o nazwach `popularne-*.jpg` (zachowując te same nazwy plików, albo
zmieniając ścieżkę w atrybucie `data-image` przy każdym przycisku w
`index.html`, sekcja `<!-- ================= POPULARNE ================= -->`).

Żeby dodać kolejną klikalną pozycję, skopiuj jeden `<button class="tag-pill">`
i ustaw mu własne `data-image` (ścieżka do zdjęcia) oraz `data-alt` (opis
zdjęcia dla czytników ekranu).

## Jak zmienić treść menu

Menu w `menu.html` jest wpisane ręcznie. Sekcje napojowe (Kawki, Na lodzie,
Matcha, Napoje) mają już **prawdziwe ceny** — przepisane ręcznie ze zdjęcia
menu z Google Maps we wrześniu 2026. Sekcje z jedzeniem (Śniadania,
Roślinne słodkości, Torty) nadal są bez cen — nie mieliśmy jeszcze zdjęcia
tej części menu; jak się pojawi, można dopisać ceny tak samo jak przy
napojach.

Najprościej jest:

- dodać / usunąć pozycję: skopiuj / usuń blok `<div class="menu-item">…</div>`,
- dodać nową kategorię: skopiuj cały blok `<div class="menu-category">…</div>`
  razem z `<hr class="divider divider-lg">` nad nim,
- dodać cenę przy pozycji, która jej jeszcze nie ma: dopisz
  `<div class="price">14 zł</div>` jako **drugi** element wewnątrz
  `<div class="menu-item">…</div>` (obok, nie wewnątrz, diva z `.name`/`.desc`)
  — styl (`.menu-item .price` w `style.css`) jest już gotowy.

**Ceny napojów warto od czasu do czasu zweryfikować z lokalem** — łatwo się
zdezaktualizują, jeśli kawiarnia zmieni cennik.

## Godziny otwarcia

Godziny (i „otwarte teraz / zamknięte”) liczone są automatycznie w
`js/main.js`, w obiekcie `HOURS` na górze pliku. Żeby je zmienić, wystarczy
poprawić tam liczby (godzina otwarcia i zamknięcia dla każdego dnia tygodnia,
`null` = zamknięte).

## Dane, które warto na bieżąco pilnować

- **Numer telefonu / adres** — występują w kilku miejscach (nav, hero, stopka,
  `menu.html`, dane strukturalne JSON-LD w `index.html`) — przy zmianie danych
  warto przeszukać całe pliki (Ctrl+F) frazą `884 848 182` / `Wschodnia 21/64`.
- **Social media** — linki do Instagrama i Facebooka są wpisane na sztywno w
  stopce, nawigacji i sekcji kontakt (ikonki to teraz własne SVG, nie emoji).

## Zabezpieczenia strony

Strona jest statyczna (brak formularzy, backendu, baz danych), więc pole do
ataku jest z natury małe. Mimo to dodane są typowe zabezpieczenia:

- **Content-Security-Policy** — ograniczenie, skąd strona może ładować
  skrypty/style/obrazki/połączenia (tylko własna domena + Google Fonts,
  Google Maps i opcjonalne Google Places API). Wpisana jest w `<meta>` w
  `index.html` / `menu.html` (działa wszędzie, nawet na GitHub Pages), a
  **prawdziwe nagłówki HTTP** (silniejsze niż meta tag, bo obejmują też
  `X-Frame-Options`, `Strict-Transport-Security` itd.) są gotowe w plikach:
  - [`_headers`](_headers) — działa automatycznie na **Netlify**,
  - [`vercel.json`](vercel.json) — działa automatycznie na **Vercel**,
  - [`.htaccess`](.htaccess) — działa na zwykłym hostingu **Apache/FTP**
    (wymaga włączonego `mod_headers`, co jest standardem).

  **GitHub Pages nie obsługuje żadnego z tych plików** (ignoruje `.htaccess`
  i nie czyta `_headers`/`vercel.json`) — tam ochronę daje wyłącznie meta tag
  w HTML, więc jeśli zależy Wam na pełnych nagłówkach, wybierzcie Netlify,
  Vercel albo hosting Apache.
- **Linki zewnętrzne** (Google Maps, Instagram, Facebook) mają
  `rel="noopener noreferrer"` — chroni przed przejęciem karty strony przez
  otwartą podstronę oraz nie wysyła adresu Waszej strony w nagłówku referrer.
- **`robots.txt`** i **`sitemap.xml`** — pomagają wyszukiwarkom (Google)
  poprawnie zaindeksować stronę. **Uwaga:** wpisany jest w nich placeholder
  `https://badylarnia.pl/` — podmieńcie na prawdziwy adres domeny, pod którą
  wystawicie stronę (Ctrl+F: `badylarnia.pl`), zanim wgracie je na serwer.

**Czego to świadomie nie obejmuje:** strona nie ma formularza kontaktowego
ani logowania, więc nie ma tu miejsca na typowe błędy (SQL injection, XSS
z danych użytkownika).

## Polityka prywatności i baner o cookies (RODO)

Doszła prosta podstrona [`polityka-prywatnosci.html`](polityka-prywatnosci.html)
(link w stopce każdej strony) opisująca po ludzku: brak formularzy/kont na
stronie, osadzoną mapę i czcionki Google (mogą przesyłać adres IP do
Google), opcjonalne Google Places API oraz to, że opinie gości (z imieniem
i nazwiskiem) są skopiowane z publicznych opinii Google Maps.

Na dole każdej strony pojawia się też raz (do momentu kliknięcia „Rozumiem”
— zapamiętywane w `localStorage` przeglądarki) baner informujący o mapie
i czcionkach Google, z linkiem do polityki prywatności.

**To jest robocza wersja, nie porada prawna.** Zanim opublikujecie stronę,
przeczytajcie `polityka-prywatnosci.html` i upewnijcie się, że zgadza się
z tym, co strona faktycznie robi (a jeśli w przyszłości dojdzie formularz,
newsletter, Google Analytics czy piksel reklamowy — trzeba będzie ten
dokument zaktualizować). W razie wątpliwości skonsultujcie się z prawnikiem
albo specjalistą RODO — szczególnie w kwestii imion i nazwisk w opiniach.
