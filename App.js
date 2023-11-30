import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
}

/*
The Navigation Container component is used to manage navigation and 
must wrap around all components using navigation. So Main component where all 
navigation resides is wrapped in Navigation Container.
*/