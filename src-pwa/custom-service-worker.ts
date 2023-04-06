/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

import { clientsClaim } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}

/////////////////////////
const CACHE_NAME = 'my-app-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // 추가로 캐싱할 파일을 여기에 나열합니다.
  'https://cdn.artdressup.com/web/main.mp4',

  'https://cdn.artdressup.com/resource/dressroom.json',

  'https://cdn.artdressup.com/menu/dressroom/menu_background.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_body.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_eyes.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_flush.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_glasses.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_hair.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_hat.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_lHand.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_mouth.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_onePiece.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_pants.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_rHand.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_shirts.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_shoes.webp',
  'https://cdn.artdressup.com/menu/dressroom/menu_wing.webp',

  'https://cdn.artdressup.com/resource/00_body/body_0000.webp',
  'https://cdn.artdressup.com/resource/01_hat/hat_0000.webp',
  'https://cdn.artdressup.com/resource/02_hair/hair_0000.webp',
  'https://cdn.artdressup.com/resource/03_eyes/eyes_0000.webp',
  'https://cdn.artdressup.com/resource/04_glasses/glasses_0000.webp',
  'https://cdn.artdressup.com/resource/05_flush/flush_0000.webp',
  'https://cdn.artdressup.com/resource/06_mouth/mouth_0000.webp',
  'https://cdn.artdressup.com/resource/07_shirts/shirts_0000.webp',
  'https://cdn.artdressup.com/resource/08_pants/pants_0000.webp',
  'https://cdn.artdressup.com/resource/09_onePiece/onePiece_0000.webp',
  'https://cdn.artdressup.com/resource/10_lHand/lHand_0000.webp',
  'https://cdn.artdressup.com/resource/11_rHand/rHand_0000.webp',
  'https://cdn.artdressup.com/resource/12_shoes/shoes_0000.webp',
  // 'https://cdn.artdressup.com/resource/13_wing/',
  // 'https://cdn.artdressup.com/resource/14_background/',
];

// 설치 이벤트를 리스닝하고, 정적 자원을 캐시합니다.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// fetch 요청에 대해 서비스 워커가 캐시된 리소스를 사용하도록 합니다.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 캐시에 일치하는 항목이 있는 경우 해당 항목을 반환합니다.
      if (cachedResponse) {
        return cachedResponse;
      }

      // 캐시에 일치하는 항목이 없는 경우 네트워크를 통해 요청을 수행하고 결과를 캐시에 저장합니다.
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// 활성화된 서비스 워커에 대한 처리를 정의합니다. (예: 이전 버전의 캐시 삭제)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
