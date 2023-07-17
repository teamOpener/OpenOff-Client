import EventCard from 'components/home/cards/EventCard/EventCard';
import React from 'react';
import { ScrollView } from 'react-native';
import { Event } from 'types/event';
import eventCardGroupStyles from './EventCardGroup.style';

interface Props {
  events: Event[];
}

const EventCardGroup = ({ events }: Props) => {
  return (
    <ScrollView
      style={eventCardGroupStyles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          handlePress={() => {
            return false;
          }}
        />
      ))}
    </ScrollView>
  );
};

export default EventCardGroup;
