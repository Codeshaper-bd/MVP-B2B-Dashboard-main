self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const payload = event.data.json();
  const title =
    payload.notification?.title || payload.data?.title || "New Notification";
  const body = payload.notification?.body || payload.data?.body || "";
  const icon = payload.notification?.icon || "/assets/logo.png";
  const url = payload.data?.url || "/";

  const options = {
    body,
    icon,
    data: { url },
    badge: "/assets/badge.png",
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
