import { useEffect, useState } from "react";
import { useLoginMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { setUser } from "../features/auth/authSlice";
import { loginSchema } from "../validations/loginSchema";
import { colors } from "../global/colors";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { insertSession } from "../db";

const Login = ({ navigation }) => {
  //Revisar lógica de estados y métodos
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerLogin, result] = useLoginMutation();

  const dispatch = useDispatch();
  
  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("");

      loginSchema.validateSync({ password, email });

      triggerLogin({ email, password });
      console.log("Registro exitoso");
    } catch (err) {
      console.log("path", err.path);

      if (err.message === "Usuario no registrado") {
      setErrorMail("Este usuario no está registrado.");
    } else {
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        default:
          break;
      }
    }
    }
  }

  useEffect(() => {
    if (result.data) {
      dispatch(setUser(result.data));
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
        .then(result => console.log(result))
        .catch(err => console.log(err.message))
    }
  }, [result]);

  return (
    <View>
      <Text>Login</Text>
      <InputForm label={"Email"} error={errorMail} onChange={setEmail} />
      <InputForm
        label={"Password"}
        error={errorPassword}
        onChange={setPassword}
        isSecure={true}
      />
      {result.isLoading ? (
        //Probar otra lógica, quizás dentro del onSubmit, aplicando opacity al boton mientras carga el loader?
        <ActivityIndicator size={100} color={colors.secondary} />
      ) : (
        <SubmitButton title={"Login"} onPress={onSubmit} />
      )}
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.descriptionTitle}>Ir a Registrarme</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "60%",
  },
  text: {
    color: "white",
    fontSize: 22,
  },
  descriptionTitle: {
    fontFamily: "Cinzel",
    fontSize: 18,
    color: "green",
    paddingVertical: 2,
    margin: 10,
  },
});
