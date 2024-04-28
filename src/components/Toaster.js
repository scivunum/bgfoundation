import React from 'react';
import { Button, notification, Space, Alert, Flex, Spin } from 'antd';
const Toaster = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message, description, type) => {
    api[type || 'info']({
      message: message ||'Notification Title',
      description:
        description || 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <>
      {contextHolder}
    </>
  );
};
export default Toaster;