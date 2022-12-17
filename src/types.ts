export interface IActivity {
  id: string;
  type: string;
  actor: string;
  object?: string | IActivity;
  content?: string;
}

export interface ILogEvent {
  timestamp: string;
  type: 'inbound' | 'outbound' | 'keep-alive';
  path: string;
  data: IActivity;
}
