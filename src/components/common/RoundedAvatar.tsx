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
  handlePress,
}: {
  dimension: Number;
  image: ImageSourcePropType;
  styles: StyleProp<any>;
  handlePress: () => void;
}) {
  return (
    <TouchableOpacity onPress={handlePress}>
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
