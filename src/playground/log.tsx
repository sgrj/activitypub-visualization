import React from 'react';

import type { ILogEvent } from '../types';
import { ActivityPubVisualization } from '../index';

import { useParams } from 'react-router-dom';

import logsFollowCreateLike from './logs/follow-create-like.json';
import logsQuestionWithVotes from './logs/question-with-votes.json';
import logsAnnounce from './logs/announce.json';
import logsUpdatePerson from './logs/update-person.json';
import logsMove from './logs/move.json';
import logsCreateUpdateDelete from './logs/create-update-delete.json';
import logsLemmyAnnounce from './logs/lemmy-announce.json';
import logsLemmyCreate from './logs/lemmy-create.json';

export default function Log() {
  const { logName } = useParams();

  const logs = () => {
    if (logName == 'create-update-delete') {
      return logsCreateUpdateDelete;
    } else if (logName == 'move') {
      return logsMove;
    } else if (logName == 'update-person') {
      return logsUpdatePerson;
    } else if (logName == 'follow-create-like') {
      return logsFollowCreateLike;
    } else if (logName == 'question-with-votes') {
      return logsQuestionWithVotes;
    } else if (logName == 'announce') {
      return logsAnnounce;
    } else if (logName == 'lemmy-announce') {
      return logsLemmyAnnounce;
    } else if (logName == 'lemmy-create') {
      return logsLemmyCreate;
    } else {
      return [];
    }
  };

  return (
    <ActivityPubVisualization
      logs={logs() as Array<ILogEvent>}
      showExplorerLink={true}
      onExplorerLinkClick={(data) => console.log(data)}
    />
  );
}
