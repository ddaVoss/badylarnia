/* ==========================================================================
   Badylarnia — konfiguracja danych na żywo (oceny Google)
   ==========================================================================

   Ta strona domyślnie pokazuje ostatnią znaną ocenę Google (wpisaną niżej
   jako wartość zapasowa). Jeśli chcesz, żeby ocena i liczba opinii
   AKTUALIZOWAŁY SIĘ SAME (na żywo, prosto z Google) — wykonaj 3 kroki
   opisane w README.md ("Jak włączyć żywe opinie Google"), a potem wklej
   tutaj swój klucz API. Bez klucza strona po prostu użyje wartości
   zapasowych poniżej — nic się nie zepsuje.
*/

window.BADYLARNIA_CONFIG = {
  // Wklej tu swój klucz Google Places API (New), np. "AIzaSyD...".
  // Zostaw puste "", żeby korzystać wyłącznie z wartości zapasowych.
  GOOGLE_PLACES_API_KEY: "",

  // Nie trzeba zmieniać — dokładna nazwa i adres, po których wyszukujemy lokal.
  PLACE_QUERY: "Badylarnia Roślinna Kawiarnia, Wschodnia 21/64, 62-030 Luboń",

  // Wartości zapasowe (widoczne, gdy klucz API nie jest ustawiony
  // lub gdy zapytanie do Google się nie powiedzie).
  FALLBACK_RATING: 5.0,
  FALLBACK_REVIEW_COUNT: 299,

  // Stały link do profilu Google (przycisk „zobacz wszystkie opinie”, mapa itp.)
  GOOGLE_MAPS_URL: "https://maps.google.com/?cid=17776102427744355183"
};
