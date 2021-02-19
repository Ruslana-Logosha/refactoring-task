import { useCreateEventMutation, useUpdateEventMutation, EventDocument, Message, Maybe} from "../graphql/generated";
import { gql } from "@apollo/client";

type EventDetailsProps = {
  event?: Event;
  message?: Maybe<Message>;
};

//не могу понять, куда в useCreateEventMutation прокинуть эти типы EventDetailsProps, message там точно нужен

const messageFragment = gql`
  fragment MyMessage on Message {
    id
    event {
      id #id should be for correct render
    }
  }
`;

  const [
    updateEventMutation,
    {
      data: updateEventData,
      loading: updateLoading,
      error: updateError
    },
  ] = useUpdateEventMutation();

const [
    createEventMutation,
    {
      data: createEventData,
      loading: createLoading,
      error: createError },
  ] = useCreateEventMutation(
  {
    update(cache, { data }) {
      const { createEvent } = data || {};
      if (createEvent) {
        cache.writeQuery({
          query: EventDocument,
          data: {
            event: createEvent,
          },
          variables: { eventId: createEvent.id },
        });
        cache.writeFragment({
          id: "Message:" + message?.id,
          fragment: messageFragment,
          data: {
            event: createEvent,
          },
        });
      }
    },
  });  

const hasGraphQlConflictError = () => {
      if (createError?.graphQLErrors && createError?.graphQLErrors.length > 0) {
      const error = createError.graphQLErrors[0] as any;
      if (error.code === "has_conflict") {
        return true;
      }
    }

    if (updateError?.graphQLErrors && updateError?.graphQLErrors.length > 0) {
      const error = updateError.graphQLErrors[0] as any;
      if (error.code === "has_conflict") {
        return true;
      }
    }
    return false;
  };

export default hasGraphQlConflictError;