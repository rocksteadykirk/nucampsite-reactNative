import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>

  );
}

/*
The Navigation Container component is used to manage navigation and 
must wrap around all components using navigation. So Main component where all 
navigation resides is wrapped in Navigation Container.
*/