import { Text, TouchableOpacity } from 'react-native';
import { CarouselElement } from 'types/apps/carousel';
import carouselCardStyle from './CarouselCard.style';

interface Props<T> {
  item: T;
  index: number;
}

const CarouselCard = <T extends CarouselElement>({ item, index }: Props<T>) => {
  return (
    <TouchableOpacity style={carouselCardStyle.container}>
      <Text style={carouselCardStyle.titleText}>{item.title}</Text>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );
};

export default CarouselCard;
