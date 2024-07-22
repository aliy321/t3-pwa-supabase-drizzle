import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: "/~offline",
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

self.addEventListener("push", (event) => {
    let data: { title: string; message: string };
    try {
        data = JSON.parse(event.data?.text() ?? '{ "title": "", "message": "" }');
    } catch (error) {
        console.error('Failed to parse push event data:', error);
        return;
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: "/icons/android-chrome-192x192.png",
        }).catch(err => console.error('Failed to show notification:', err)) // Catch any errors in showing the notification
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                if (clientList.length > 0) {
                    for (const client of clientList) {
                        if (client.focused) {
                            return client.focus();
                        }
                    }
                    return clientList[0]!.focus();
                }
                return self.clients.openWindow("/");
            })
            .catch(err => console.error('Failed to handle notification click:', err))
    );
});

serwist.addEventListeners();
