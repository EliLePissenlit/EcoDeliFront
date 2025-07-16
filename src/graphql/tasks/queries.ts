import { gql } from '@apollo/client';

import userFragment from '../fragments/user';
import categoryFragment from '../fragments/category';
import {
  taskFragment,
  addressFragment,
  shippingFragment,
  taskMessageFragment,
  taskApplicationFragment,
} from '../fragments';

const GET_TASK = gql`
  query getTask($id: ID!) {
    getTask(id: $id) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_TASKS = gql`
  query listTasks($filters: TaskFilters) {
    listTasks(filters: $filters) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_MY_TASKS = gql`
  query getMyTasks {
    getMyTasks {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_TASK_APPLICATIONS = gql`
  query getTaskApplications($taskId: ID!) {
    getTaskApplications(taskId: $taskId) {
      ...TaskApplicationFragment
    }
  }
  ${taskApplicationFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_MY_APPLICATIONS = gql`
  query getMyApplications {
    getMyApplications {
      ...TaskApplicationFragment
      task {
        ...TaskFragment
      }
    }
  }
  ${taskApplicationFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_TASK_MESSAGES = gql`
  query getTaskMessages($taskId: ID!) {
    getTaskMessages(taskId: $taskId) {
      ...TaskMessageFragment
    }
  }
  ${taskMessageFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const GET_UNREAD_MESSAGES_COUNT = gql`
  query getUnreadMessagesCount {
    getUnreadMessagesCount
  }
`;

const LIST_PENDING_TASKS = gql`
  query listPendingTasks {
    listPendingTasks {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const LIST_TASKS_BY_STATUS = gql`
  query listTasksByStatus($status: TaskStatus!) {
    listTasksByStatus(status: $status) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

export {
  GET_TASK,
  GET_TASKS,
  GET_MY_TASKS,
  GET_TASK_MESSAGES,
  LIST_PENDING_TASKS,
  GET_MY_APPLICATIONS,
  LIST_TASKS_BY_STATUS,
  GET_TASK_APPLICATIONS,
  GET_UNREAD_MESSAGES_COUNT,
};
