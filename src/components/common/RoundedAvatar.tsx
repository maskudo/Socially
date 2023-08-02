import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
} from 'react-native';

export default function RoundedAvatar({
  dimension,
  image,
  styles,
}: {
  dimension: Number;
  image: ImageSourcePropType;
  styles: StyleProp<any>;
}) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Image
        source={image}
        style={{
          height: dimension,
          width: dimension,
          borderRadius: 100,
          borderWidth: 1,
          ...styles,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
