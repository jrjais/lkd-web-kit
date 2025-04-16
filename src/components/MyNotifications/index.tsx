import { Notifications, NotificationsProps } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export interface MyNotificationPrpos extends NotificationsProps {}

export const MyNotifications = (props: MyNotificationPrpos) => (
  <Notifications
    position="top-center"
    {...props}
  />
);
