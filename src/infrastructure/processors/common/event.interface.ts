export interface EventPayload<T> {
  messageId: string;
  body: T;
}
