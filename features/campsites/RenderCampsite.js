
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={campsite.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{campsite.description}</Text>
            </Card>
        );
    }
    return <View />;
};

export default RenderCampsite;



// This component will render campsite details at the bottom of the screen when a campsite is clicked.
// This component will use conditional rendering. it will use a condition to decide what it will render.

// destructuring the campsites property that is being passed in from the campsiteInfo  screen
// An empty View to return if campsite prop returns false.
// !!! When using conditional rendering it is important to always return something from the component. If the component doesn't return anything it will result in an error!



