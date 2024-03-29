import { useSelector } from "react-redux";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../global/colors";
import AddButton from "../components/AddButton";

const MyProfile = ({ navigation }) => {

  const image = useSelector((state) => state.authReducer.value.imageCamera);

  const launchCamera = async () => {
    navigation.navigate("Image Selector");
  };

  const launchLocation = async () => {
    navigation.navigate("Location Selector");
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6073/6073873.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <AddButton title="Agregar foto" onPress={launchCamera} />
          <AddButton title="Agregar domicilio" onPress={launchLocation} />
        </>
      )}
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.back_beige,
    height: "100%",
  },
  image: {
    margin: 50,
    width: 200,
    height: 200,
  },
});
