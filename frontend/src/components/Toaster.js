import React from 'react';
import { notification} from 'antd';
const Toaster = ({onClick}) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message, description, type) => {
    api[type || 'info']({
      message: message ||'Notification Title',
      description:
        description || 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  openNotificationWithIcon('Notification Title', 'This is the content of the notification. This is the content of the notification. This is the content of the notification.', 'info');
  return (
    <>
      {contextHolder}
    </>
  );
};
export default Toaster;