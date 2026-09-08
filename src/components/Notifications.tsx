import api from "../api/axios";
import { Button } from "../ui";

export const Notifications = () => {
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  const handleSubscription = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscriptionObject = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    await api.post("/api/v1/auth/subscribe", subscriptionObject);
  };

  return <Button onClick={handleSubscription}>Subscribe</Button>;
};