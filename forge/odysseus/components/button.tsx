import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const Button = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log("Button press!")}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Button;
