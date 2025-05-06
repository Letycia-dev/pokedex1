// Inicializa o i18n primeiro
import './translate/i18n';

// Importa componentes essenciais do React Native
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

// Importa o React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas
import Home from './components/Home';
import Detail from './components/Detail';

// Importa a store do Redux e o Provider
import { Provider } from 'react-redux';
import store from './store';

// Importa estilos globais se necessário (opcional para SafeAreaView)
import styles from './assets/styles';

// Cria o Stack Navigator
const Stack = createNativeStackNavigator();

// App principal
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

/*
Explicação Passo a Passo:
Importações:
View e StatusBar são componentes do React Native.
NavigationContainer e createNativeStackNavigator são usados para configurar a navegação.
Home e Detail são componentes de tela.
styles contém os estilos do aplicativo.
store é a store do Redux.
Provider é usado para fornecer a store do Redux aos componentes.
Criação do Stack Navigator:
createNativeStackNavigator cria um stack navigator para navegação entre telas.
Função Principal App:
Envolve o aplicativo com o Provider para que todos os componentes possam acessar a store do Redux.
Usa uma View para envolver o conteúdo do aplicativo e aplica estilos.
Configura a StatusBar para personalizar a barra de status do dispositivo.
Usa NavigationContainer para gerenciar o estado da navegação.
Configura o Stack.Navigator com duas telas: Home e Detail, e oculta o cabeçalho padrão das telas.
*/