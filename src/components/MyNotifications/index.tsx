import { Notifications, NotificationsProps } from '@mantine/notifications'

export interface MyNotificationPrpos extends NotificationsProps {}

export const MyNotifications = (props: MyNotificationPrpos) => (
  <Notifications position="top-center" pauseResetOnHover="notification" {...props} />
)
