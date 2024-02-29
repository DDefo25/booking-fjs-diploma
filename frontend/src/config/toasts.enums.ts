export enum ToastTypes {
  ErrorResponse = 'error-response',
  ErrorWs = 'error-ws',
  MessageSupport = 'message-support',
  Notify = 'notify',
  Common = 'common',
}

export enum ToastClasses {
  Error = 'bg-warning-subtle',
  ErrorWs = 'bg-warning-subtle',
  MessageSupport = 'bg-info-subtle',
  Notify = 'bg-success-subtle',
  Common = 'bg-body',
}

export enum ToastImage {
  Error = 'https://picsum.photos/20/20?random=1',
  MessageSupport = 'https://picsum.photos/20/20?random=2',
  Notify = 'https://picsum.photos/20/20?random=3',
  Common = 'https://picsum.photos/20/20?random=4',
  ErrorWs = 'https://picsum.photos/20/20?random=5',
}