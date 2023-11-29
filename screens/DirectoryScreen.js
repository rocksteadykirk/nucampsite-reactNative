import { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

const DirectoryScreen = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES);

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <ListItem
                onPress={() => navigation.navigate('CampsiteInfo', { campsite })
                }
            >
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;






// object destructuring and simultaneous renaming here.
// Similar to the listItem HTML element. Iside it we nest other components to configure how the ListItem renders 
// Avatar for displaying the campsite images data. Rounded prop used to make the image appear as a circle. Nothing needs to be passed to the rounded prop. It is whats known as a boolean prop. */}
// Defines main contnt displayed inside the ListItem. 
// FlatList in React Native efficiently renders scrollable lists of items, optimizing memory usage and performance by rendering only what's currently visible on the screen and supporting lazy loading.
// data prop must be in the form of an array that the FlatList will use to render items from.
// special rendering function provided by FlatList.
// keyExtrctor must be set equal to a function. Instead of creating a variable for it we  write one inline with an arrow function. Similar to what was done in React when we returned list items from a loop with the map method. We had to create a key.













