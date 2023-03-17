export interface IActivity {
  id: string;
  type: string;
  actor?: string;
  object?: string | IActivity;
  content?: string;
  name?: string;
  target?: string;
}

export interface ILogEvent {
  timestamp: string;
  sender: string;
  type: 'inbound' | 'outbound' | 'keep-alive';
  path: string;
  data: IActivity;
}
