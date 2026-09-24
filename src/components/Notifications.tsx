import api from "../api/axios";
import { Button } from "../ui";
import config from "../config/config";

export const Notifications = () => {
  const handleSubscription = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscriptionObject = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: config.vapidPublicKey,
    });

    await api.post("/api/v1/auth/subscribe", subscriptionObject);
  };

  return <Button onClick={handleSubscription}>Subscribe</Button>;
};
