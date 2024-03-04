import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AEB879',
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 55, 
    backgroundColor: '#1F2021',
    border: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#F6F6F6',
    textAlign: 'center',
    lineHeight: 35,
    fontWeight: '500',
    fontSize: 19,
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  containerForm: {
    backgroundColor: '#F6F6F6',
    textAlign: 'center',
    paddingVertical: 50,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: 330,
    height: 500,
  },
  h1: {
    fontSize: 35,
    fontWeight: '300',
    marginBottom: 5,
    textAlign: 'center',
  },
  p: {
    textAlign: 'center',
    marginBottom: 50,
  },
  error: {
    color: 'red',
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  constraseñaOlvidada: {
    marginTop: 20,
    textAlign: 'center',
    color: '#1F2021',
    textDecorationLine: 'underline',
  },
  input:{
    height: 55, 
    borderWidth: .5,
    backgroundColor: '#F6F6F6',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  containerForm1: {
    backgroundColor: '#F6F6F6',
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default styles;
